import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { useFetch, useSaga } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import FormCard from 'components/FormCard';
import TagsCard from 'components/TagsCard';
import TermGallery from './TermGallery';
import AddImageByURL from './AddImageByURL';
import AudioList from './AudioList';

const fields = [
  {
    id: 'lang',
    type: 'lang',
  },
  {
    id: 'text',
  },
  {
    id: 'transcript',
    label: 'Transcription',
    type: 'multilang',
  },
];

export const Term = () => {
  const task = useFetch(api.term.get);
  const submit = useSaga(api.term.update);

  if (task.pending) {
    return <Loading />;
  }
  const term = task.result;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <FormCard type="Term" id={term.uid} fields={fields} data={term} submit={submit} />
          <TagsCard id={term.uid} tags={term.tag} refreshTask={task} />
          <Card>
            <CardHeader>
              <strong>Visual</strong>
              <span className="ml-2">
                <AddImageByURL termId={term.uid} refreshTask={task} />
              </span>
            </CardHeader>
            <CardBody>
              <TermGallery term={term} />
            </CardBody>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <strong>Audio</strong>
            </CardHeader>
            <CardBody>
              <AudioList term={term} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Term;
