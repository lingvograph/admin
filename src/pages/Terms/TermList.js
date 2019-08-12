import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import Moment from 'react-moment';
import { confirm } from 'components/confirm';
import InfiniteList from 'components/InfiniteList';
import { useSaga } from 'hooks';
import * as api from 'api';
import { Link } from 'react-router-dom';
import { relationMap } from 'termquery';

const TermInfo = ({ style, parent, item, kind }) => {
  const unlinkRelated = useSaga(api.term.unlinkRelated);

  const remove = () => {
    confirm({
      content: 'Are you sure you want to unlink this term?',
      apply: () => unlinkRelated({ termId: parent.uid, id: item.uid, edge: kind }),
    });
  };

  return (
    <ListGroupItem className="flex" style={style}>
      <div className="mr-2">
        <Link to={`/terms/${item.uid}`}>{item.text}</Link>
      </div>
      <div className="mr-2">
        <Moment date={item.created_at} fromNow />
      </div>
      <div className="mr-2">
        <span>by&nbsp;</span>
        <span>{item.created_by.name || 'system'}</span>
      </div>
      <div className="mr-2">
        <Button outline color="danger" onClick={() => remove(item)}>
          <i className="fa fa-trash" />
        </Button>
      </div>
    </ListGroupItem>
  );
};

const TermList = ({ term, kind }) => {
  const rel = relationMap[kind];
  const initialData = { items: term[kind], total: term[rel.count] };
  const loadMoreItems = ({ offset, limit }) => api.term.list({ kind, termId: term.uid, offset, limit });

  return (
    <InfiniteList
      className="list-group"
      data={initialData}
      loadMoreItems={loadMoreItems}
      itemSize={61}
      height={total => 61 * Math.max(1, Math.min(10, total))}
    >
      {({ item, index, style }) => {
        return <TermInfo key={index} style={style} parent={term} item={item} kind={kind} />;
      }}
    </InfiniteList>
  );
};

export default TermList;
