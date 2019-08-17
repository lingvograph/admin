import React from 'react';
import Autosuggest from 'react-autosuggest';

const defaultTheme = {
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

const CustomAutosuggest = ({ theme, ...props }) => <Autosuggest theme={theme || defaultTheme} {...props} />;

export default CustomAutosuggest;
