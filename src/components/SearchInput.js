import React from 'react';
import { Input } from 'reactstrap';
import { useSearchParams } from 'hooks';

const SearchInput = () => {
  const { params, replaceParams } = useSearchParams();
  const paramKey = 'searchString';
  const searchString = params.get(paramKey) || '';

  const handleChange = e => {
    const value = e.target.value;
    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }
    replaceParams(params);
  };

  return <Input type="text" placeholder="Search by text" value={searchString} onChange={handleChange}/>;
};

export default SearchInput;
