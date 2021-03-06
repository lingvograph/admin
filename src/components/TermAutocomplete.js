import React, { useState } from 'react';
import Autosuggest from './Autosuggest';
import * as api from 'api';
import { relationMap } from 'termquery';

const TermAutocomplete = ({ value, onChange, kind, except = [] }) => {
  const meta = relationMap[kind];
  const [text, setText] = useState((value && (value.text || value.uid)) || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event, { newValue, method }) => {
    setText(newValue);

    if (method === 'enter' || method === 'click') {
      event.preventDefault();
      const term = suggestions.find(t => t.text === newValue);
      onChange(term);
    }
  };

  const fetchTerms = async ({ value }) => {
    // TODO cancel previous request
    setLoading(true);

    try {
      const result = await api.term.list({ searchString: value });
      const exceptIds = new Set(except.map(t => t.uid));
      setSuggestions(result.items.filter(t => !exceptIds.has(t.uid)));
    } catch (err) {
      console.log(err);
      setSuggestions([]);
    }

    setLoading(false);
  };

  return (
    <div>
      <Autosuggest
        shouldRenderSuggestions={t => t.length >= 3}
        suggestions={suggestions}
        onSuggestionsFetchRequested={fetchTerms}
        onSuggestionsClearRequested={() => {
          setSuggestions([]);
        }}
        getSuggestionValue={t => t.text || t.uid}
        renderSuggestion={t => <span>{t.text || t.uid}</span>}
        inputProps={{
          className: 'form-control',
          placeholder: `Find ${meta.label}...`,
          onChange: handleChange,
          value: text,
        }}
      />
    </div>
  );
};

export default TermAutocomplete;
