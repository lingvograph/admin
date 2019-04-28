import React from 'react';
import { Input } from 'reactstrap';
import { useSearchParams } from 'hooks';

const SearchInput = () => {
  const { params, replaceParam } = useSearchParams();
  const paramKey = 'searchString';
  const searchString = params.get(paramKey) || '';

  const handleChange = e => replaceParam(paramKey, e.target.value);

  return <Input type="text" placeholder="Search by text" value={searchString} onChange={handleChange} />;
};

export default SearchInput;
