import _ from 'lodash';
import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useRefresh } from 'hooks';

const InfiniteList = ({
  data: initialData,
  loadMoreItems,
  children,
  height,
  itemClassName = 'list-group-item',
  ...listProps
}) => {
  const [data, setData] = useState(initialData);
  useRefresh(() => setData(initialData));

  const isItemLoaded = index => index >= 0 && index < data.items.length && !!data.items[index];

  const loadMore = async (startIndex, stopIndex) => {
    const result = await loadMoreItems({ offset: startIndex, limit: stopIndex - startIndex + 1 });
    const items = data.items.slice();
    items.length = stopIndex + 1;
    for (let i = 0; i < result.items.length; i++) {
      items[startIndex + i] = result.items[i];
    }
    setData({ items, total: result.total });
  };

  const computedHeight = _.isFunction(height) ? height(data.total) : height;

  return (
    <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={data.total} loadMoreItems={loadMore}>
      {({ onItemsRendered, ref }) => (
        <List itemCount={data.total} onItemsRendered={onItemsRendered} ref={ref} height={computedHeight} {...listProps}>
          {({ index, style }) => {
            const item = data.items[index];
            if (item) {
              return children({ item, index, style });
            }
            // TODO render custom loading item
            return (
              <div key={index} style={style} className={itemClassName}>
                Loading....
              </div>
            );
          }}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteList;
