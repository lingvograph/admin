import React, { useState } from 'react';
import Autosuggest from './Autosuggest';
import * as api from 'api';

const TermAutocomplete = ({ value, onChange, except = [] }) => {
  const [text, setText] = useState((value && (value.text || value.uid)) || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event, { newValue, method }) => {
    if (method === 'enter') {
      event.preventDefault();
      const term = suggestions.find(t => t.text === newValue);
      onChange(term);
    } else {
      setText(newValue);
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
          placeholder: 'Find translation...',
          onChange: handleChange,
          value: text,
        }}
      />
    </div>
  );
};

export default TermAutocomplete;
