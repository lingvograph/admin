import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';
import { useFetch } from 'hooks';
import * as api from 'api';
import 'scss/react-tagsinput.scss';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const labelKey = 'text';

const suggestTheme = {
  container: {
    display: 'inline-block',
    position: 'relative',
  },
  input: {
    width: 240,
    height: 30,
    //fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    //fontSize: 16,
  },
  inputFocused: {
    outline: 'none',
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  suggestionsContainer: {
    display: 'none',
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 32,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    //fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    //fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 100,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px',
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd',
  },
};

const CustomTagsInput = ({ tags = [], onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const fetchAllTags = ({ abortController }) => api.tag.list({ abortController, page: 1, limit: 100 });
  const task = useFetch(fetchAllTags);

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
    const handleOnChange = (e, { newValue, method }) => {
      if (method === 'enter') {
        e.preventDefault();
      } else {
        props.onChange(e);
      }
    };

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestions}
        shouldRenderSuggestions={() => true}
        getSuggestionValue={t => t[labelKey] || t.uid}
        renderSuggestion={t => <span>{t[labelKey] || t.uid}</span>}
        inputProps={{ ...props, onChange: handleOnChange }}
        onSuggestionSelected={(e, { suggestion }) => {
          addTag(suggestion[labelKey]);
        }}
        onSuggestionsClearRequested={() => {
          setSuggestions([]);
        }}
        onSuggestionsFetchRequested={({ value }) => {
          setSuggestions(getSuggestions(value));
        }}
        theme={suggestTheme}
      />
    );
  };

  const handleChange = tags => {
    const tagObjects = allTags.filter(t => tags.includes(t[labelKey]));
    onChange(tagObjects);
  };

  const value = tags.map(t => t[labelKey]);

  return <TagsInput renderInput={renderAutocomplete} value={value} onChange={handleChange} />;
};

export default CustomTagsInput;
