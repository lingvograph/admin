import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import * as R from 'ramda';

const ListPagination = ({ page, total, limit }) => {
  const pageCount = Math.ceil(total / limit);
  if (pageCount <= 1) {
    return null;
  }

  const itemCount = Math.min(5, pageCount);
  const items = R.range(1, itemCount);

  const buttons = R.map((t, k) => (
    <PaginationItem key={k}>
      <PaginationLink tag="button">{t}</PaginationLink>
    </PaginationItem>
  ));

  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink previous tag="button" disabled={page === 1} />
      </PaginationItem>
      {buttons(items)}
      <PaginationItem>
        <PaginationLink next tag="button" disabled={page === pageCount} />
      </PaginationItem>
    </Pagination>
  );
};

export default ListPagination;
