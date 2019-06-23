import React, { useState } from 'react';
import { ListGroupItem, ButtonGroup, Button, Badge } from 'reactstrap';
import Moment from 'react-moment';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { confirm } from 'components/confirm';
import { useSaga, useRefresh } from 'hooks';
import * as api from 'api';

const source = src => {
  const url = new URL(src);
  const host = url.host.split('.');
  return host.length >= 3 ? host.slice(1).join('.') : url.host;
};

const AudioItem = ({ style, term, audio }) => {
  const deleteAudio = useSaga(api.file.deleteAudio);

  const remove = () => {
    confirm({
      content: 'Are you sure you want to delete this audio file?',
      apply: () => deleteAudio({ termId: term.uid, id: audio.uid }),
    });
  };

  const play = () => {
    const sound = new Audio(audio.url);
    sound.play();
  };

  return (
    <ListGroupItem className="flex" style={style}>
      <div className="mr-2">
        <Button onClick={play}>
          <i className="fa fa-play-circle fa-lg" />
        </Button>
      </div>
      <div className="mr-2">
        <Moment date={audio.created_at} fromNow />
      </div>
      <div className="mr-2">
        <span>by&nbsp;</span>
        <span>{audio.created_by.name || 'system'}</span>
      </div>
      <div className="mr-2">
        <Badge color="info">{source(audio.url)}</Badge>
      </div>
      <div className="mr-2">
        <ButtonGroup size="sm">
          <Button outline color="info">
            <i className="fa fa-eye" />
            &nbsp;{audio.views}
          </Button>
          <Button outline color="info">
            <i className="fa fa-thumbs-o-up" />
            &nbsp;{audio.likes}
          </Button>
          <Button outline color="info">
            <i className="fa fa-thumbs-o-down" />
            &nbsp;{audio.dislikes}
          </Button>
        </ButtonGroup>
      </div>
      <div className="mr-2">
        <Button outline color="danger" onClick={() => remove(audio)}>
          <i className="fa fa-trash" />
        </Button>
      </div>
    </ListGroupItem>
  );
};

const InfiniteAudioList = ({ term }) => {
  const initialData = { items: term.audio, total: term.audioTotal };
  const [data, setData] = useState(initialData);
  useRefresh(() => setData(initialData));

  const isItemLoaded = index => index >= 0 && index < data.items.length && !!data.items[index];

  const loadMoreItems = async (startIndex, stopIndex) => {
    const result = await api.term.getAudio({ id: term.uid, offset: startIndex, limit: stopIndex - startIndex + 1 });
    const items = data.items.slice();
    items.length = stopIndex + 1;
    for (let i = 0; i < result.items.length; i++) {
      items[startIndex + i] = result.items[i];
    }
    setData({ items, total: result.total });
  };

  return (
    <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={data.total} loadMoreItems={loadMoreItems}>
      {({ onItemsRendered, ref }) => (
        <List
          className="list-group"
          height={61 * Math.max(3, Math.min(10, data.total))}
          itemCount={data.total}
          itemSize={61}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {({ index, style }) => {
            const audio = data.items[index];
            if (audio) {
              return <AudioItem key={index} style={style} term={term} audio={audio} />;
            } else {
              return (
                <div key={index} style={style} className="list-group-item">
                  Loading....
                </div>
              );
            }
          }}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteAudioList;
