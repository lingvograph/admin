import React from 'react';
import warning from 'warning';
import { useDispatch } from 'redux-react-hook';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import * as R from 'ramda';
import { push } from 'connected-react-router';
import { useLocation } from 'hooks';

function useNav({ page, total, limit, pageCount }) {
  const dispatch = useDispatch();
  const { location } = useLocation();

  const go = (page) => {
    warning(page >= 1 && page <= pageCount, 'invalid page');

    const params = new URLSearchParams(location.search);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page);
    }

    dispatch(push({
      pathname: location.pathname,
      search: params.toString(),
    }));
  };

  const prev = () => {
    if (page - 1 >= 1) {
      return go(page - 1);
    }
  };

  const next = () => {
    if (page + 1 <= pageCount) {
      return go(page + 1);
    }
  };

  return { prev, next, go };
}

const ListPagination = ({ page, total, limit }) => {
  const pageCount = Math.ceil(total / limit);
  const { prev, next, go } = useNav({ page, total, limit, pageCount });

  if (pageCount <= 1) {
    return null;
  }

  const itemCount = Math.min(5, pageCount);
  const firstPage = Math.max(1, page - itemCount + 1);
  const items = R.range(firstPage, firstPage + itemCount);

  const buttons = items.map((p, idx) => (
    <PaginationItem key={idx} active={p === page}>
      <PaginationLink tag="button" onClick={() => go(p)}>{p}</PaginationLink>
    </PaginationItem>
  ));

  return (
    <Pagination>
      <PaginationItem key={'prev'}>
        <PaginationLink previous tag="button" disabled={page === 1} onClick={prev} />
      </PaginationItem>
      {buttons}
      <PaginationItem key={'next'}>
        <PaginationLink next tag="button" disabled={page === pageCount} onClick={next} />
      </PaginationItem>
    </Pagination>
  );
};

export default ListPagination;
