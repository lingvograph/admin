import React from 'react';
import { Badge, Button, Card, CardBody, CardHeader } from 'reactstrap';
import AudioList from './AudioList';
import { useCurrentUser, useSaga } from 'hooks';
import * as api from 'api';

const AudioCard = ({ term }) => {
  const currentUser = useCurrentUser();
  const restoreAudio = useSaga(api.admin.restoreRemoteAudio, { args: [{ term, userId: currentUser.uid }] });

  return (
    <Card>
      <CardHeader>
        <strong>
          Audio <Badge color="info">{term.audio_count}</Badge>
        </strong>
        <span className="ml-2">
          <Button size="sm" onClick={() => restoreAudio()}>
            Get From Internet
          </Button>
        </span>
      </CardHeader>
      <CardBody>
        <AudioList term={term} />
      </CardBody>
    </Card>
  );
};

export default AudioCard;
