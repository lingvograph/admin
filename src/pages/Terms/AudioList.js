import React from 'react';
import { ListGroupItem, ButtonGroup, Button, Badge } from 'reactstrap';
import Moment from 'react-moment';
import { confirm } from 'components/confirm';
import InfiniteList from 'components/InfiniteList';
import { useSaga } from 'hooks';
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

const AudioList = ({ term }) => {
  const initialData = { items: term.audio, total: term.audio_count };
  const loadMoreItems = ({ offset, limit }) => api.term.getAudio({ id: term.uid, offset, limit });

  return (
    <InfiniteList
      className="list-group"
      data={initialData}
      loadMoreItems={loadMoreItems}
      itemSize={61}
      height={total => 61 * Math.max(3, Math.min(10, total))}
    >
      {({ item, index, style }) => <AudioItem key={index} style={style} term={term} audio={item} />}
    </InfiniteList>
  );
};

export default AudioList;
