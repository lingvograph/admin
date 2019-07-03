import React from 'react';
import { Col, Row } from 'reactstrap';
import { useFetch, useSaga } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import FormCard from 'components/FormCard';
import TagsCard from 'components/TagsCard';
import VisualCard from './VisualCard';
import AudioCard from './AudioCard';
import TranslationCard from './TranslationCard';

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
  const term = task.result;

  if (task.pending) {
    return <Loading />;
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <FormCard type="Term" id={term.uid} fields={fields} data={term} submit={submit} />
          <TagsCard id={term.uid} tags={term.tag} refreshTask={task} />
          <TranslationCard term={term} />
          <VisualCard term={term} />
        </Col>
        <Col lg={6}>
          <AudioCard term={term} />
        </Col>
      </Row>
    </div>
  );
};

export default Term;
