import React from 'react';
import { useSearchParams } from 'hooks';
import LangDropdown from 'components/LangDropdown';

const LangFilter = () => {
  const { params, replaceParams } = useSearchParams();
  const lang = params.get('lang') || 'any';
  const handleChange = lang => {
    if (!lang || lang === 'any') {
      params.delete('lang');
    } else {
      params.set('lang', lang);
    }
    replaceParams(params);
  };
  return <LangDropdown lang={lang} onChange={handleChange}/>;
};

export default LangFilter;
