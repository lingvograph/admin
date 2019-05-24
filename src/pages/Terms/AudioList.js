import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemText, ButtonGroup, Button } from 'reactstrap';
import Moment from 'react-moment';

const AudioItem = ({ audio }) => {
  const play = () => {
    const sound = new Audio(audio.url);
    sound.play();
  };

  return (
    <ListGroupItem className="flex">
      <ListGroupItemText className="mr-2">
        <Button onClick={play}>
          <i className="fa fa-play-circle fa-lg" />
        </Button>
      </ListGroupItemText>
      <ListGroupItemText className="mr-2">
        <Moment date={audio.created_at} fromNow />
      </ListGroupItemText>
      <ListGroupItemText className="mr-2">
        <span>by&nbsp;</span>
        <span>{audio.created_by.name || 'system'}</span>
      </ListGroupItemText>
      <ListGroupItemText>
        <ButtonGroup>
          <Button outline color="info">
            <i className="fa fa-eye fa-lg" />
            &nbsp;{audio.views}
          </Button>
          <Button outline color="info">
            <i className="fa fa-thumbs-o-up fa-lg" />
            &nbsp;{audio.likes}
          </Button>
          <Button outline color="info">
            <i className="fa fa-thumbs-o-down fa-lg" />
            &nbsp;{audio.dislikes}
          </Button>
        </ButtonGroup>
      </ListGroupItemText>
    </ListGroupItem>
  );
};

const AudioList = ({ term }) => {
  const items = (term.audio || []).map((a, idx) => <AudioItem key={idx} audio={a} />);
  return <ListGroup>{items}</ListGroup>;
};

export default AudioList;
