import React from 'react';
import { Input } from 'reactstrap';
import { useDispatch } from 'redux-react-hook';
import { replace } from 'connected-react-router';
import { useLocation } from 'hooks';

const SearchInput = () => {
  const { location } = useLocation();
  const params = new URLSearchParams(location.search);
  const paramKey = 'searchString';
  const searchString = params.get(paramKey) || '';

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const value = e.target.value;
    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }
    dispatch(replace({
      pathname: location.pathname,
      search: params.toString(),
    }));
  };

  return (
    <Input type="text" placeholder="Search by text" value={searchString} onChange={handleChange}/>
  );
};

export default SearchInput;
