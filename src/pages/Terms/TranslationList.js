import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import Moment from 'react-moment';
import { confirm } from 'components/confirm';
import InfiniteList from 'components/InfiniteList';
import { useSaga } from 'hooks';
import * as api from 'api';
import { Link } from 'react-router-dom';

const TranslationItem = ({ style, parent, item }) => {
  const unlinkTranslation = useSaga(api.term.unlinkTranslation);

  const remove = () => {
    confirm({
      content: 'Are you sure you want to detach this translation?',
      apply: () => unlinkTranslation({ termId: parent.uid, id: item.uid }),
    });
  };

  return (
    <ListGroupItem className="flex" style={style}>
      <div className="mr-2">
        <Link to={`/terms/${item.uid}`}>
          {item.text}@{item.lang}
        </Link>
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

const TranslationList = ({ term }) => {
  const initialData = { items: term.translated_as, total: term.translationTotal };
  const loadMoreItems = ({ offset, limit }) =>
    api.term.list({ kind: 'translationList', termId: term.uid, offset, limit });

  return (
    <InfiniteList
      className="list-group"
      data={initialData}
      loadMoreItems={loadMoreItems}
      itemSize={61}
      height={total => 61 * Math.max(1, Math.min(10, total))}
    >
      {({ item, index, style }) => {
        return <TranslationItem key={index} style={style} parent={term} item={item} />;
      }}
    </InfiniteList>
  );
};

export default TranslationList;
