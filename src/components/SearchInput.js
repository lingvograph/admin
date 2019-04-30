import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { useSearchParams } from 'hooks';

const SearchInput = () => {
  const { params, replaceParam } = useSearchParams();
  const paramKey = 'searchString';
  const searchString = params.get(paramKey) || '';

  const handleChange = e => replaceParam(paramKey, e.target.value);

  return (
    <InputGroup>
      <Input type="text" placeholder="Search by text" value={searchString} onChange={handleChange} />
      <InputGroupAddon addonType="append">
        <Button type="button" color="primary">
          <i className="fa fa-search" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
