import React from 'react';
import { ListGroup, ListGroupItem, ButtonGroup, Button, Badge } from 'reactstrap';
import Moment from 'react-moment';
import { confirm } from 'components/confirm';
import { useSaga } from 'hooks';
import * as api from 'api';

const source = src => {
  const url = new URL(src);
  const host = url.host.split('.');
  return host.length >= 3 ? host.slice(1).join('.') : url.host;
};

const AudioItem = ({ audio, remove }) => {
  const play = () => {
    const sound = new Audio(audio.url);
    sound.play();
  };

  return (
    <ListGroupItem className="flex">
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
  const deleteAudio = useSaga(api.file.delete);
  const items = (term.audio || []).map((a, idx) => {
    const remove = () => {
      confirm({
        content: 'Are you sure you want to delete this audio file?',
        apply: () => deleteAudio({ id: a.uid }),
      });
    };
    return <AudioItem key={idx} audio={a} remove={remove} />;
  });
  return <ListGroup>{items}</ListGroup>;
};

export default AudioList;
