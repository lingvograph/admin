import React, { useState } from 'react';
import classNames from 'classnames';
import TagsInput from 'react-tagsinput';
import Autosuggest from './Autosuggest';
import { useCache, useFetch } from 'hooks';
import * as api from 'api';
import { delay } from 'utils';
import 'scss/react-tagsinput.scss';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const labelKey = 'text';

const CustomTagsInput = ({ tags = [], onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const fetchAllTags = ({ abortController }) => api.tag.list({ abortController, page: 1, limit: 100 });

  const cache = useCache('tags');
  const task = useFetch(async (...args) => {
    if (cache()) {
      return cache();
    }
    await delay(100);
    const result = await fetchAllTags(...args);
    cache(result);
    return result;
  });

  const readOnly = !onChange;
  const placeholder = readOnly ? '' : 'Add a tag';
  const className = classNames('react-tagsinput', {
    'react-tagsinput--readonly': readOnly,
  });

  const allTags = (task.result || {}).items || [];

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters((value || '').trim());

    if (!escapedValue) {
      return [];
    }

    const regex = new RegExp(`^${escapedValue}`, 'i');
    return allTags.filter(t => !tags.some(t2 => t2[labelKey] === t[labelKey])).filter(t => regex.test(t[labelKey]));
  }

  const renderAutocomplete = ({ addTag, ...props }) => {
    const handleChange = (e, { newValue, method }) => {
      if (method === 'enter') {
        e.preventDefault();
      } else {
        props.onChange(e);
      }
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        getSuggestionValue={t => t[labelKey] || t.uid}
        renderSuggestion={t => <span>{t[labelKey] || t.uid}</span>}
        inputProps={{ ...props, onChange: handleChange, readOnly, placeholder }}
        onSuggestionSelected={(e, { suggestion }) => {
          addTag(suggestion[labelKey]);
        }}
        onSuggestionsClearRequested={() => {
          setSuggestions([]);
        }}
        onSuggestionsFetchRequested={({ value }) => {
          setSuggestions(getSuggestions(value));
        }}
      />
    );
  };

  const handleChange = tags => {
    const tagObjects = allTags.filter(t => tags.includes(t[labelKey]));
    onChange(tagObjects);
  };

  const value = tags.map(t => t[labelKey]);

  return <TagsInput className={className} renderInput={renderAutocomplete} value={value} onChange={handleChange} />;
};

export default CustomTagsInput;
