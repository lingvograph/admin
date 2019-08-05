import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import { useFetch, useSaga } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import FormCard from 'components/FormCard';
import TagsCard from 'components/TagsCard';
import VisualCard from './VisualCard';
import AudioCard from './AudioCard';
import RelatedCard from './RelatedCard';

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

const TagButton = ({ term }) => {
  const toggleTagType = useSaga(api.term.toggleTagType);
  const isTag = term.Tag === '';

  const handleClick = () => {
    toggleTagType({ termId: term.uid, isTag: !isTag });
  };

  return (
    <span className="ml-2">
      <Button size="sm" outline={true} onClick={handleClick}>
        {isTag ? 'NOT TAG' : 'TAG'}
      </Button>
    </span>
  );
};

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
          <FormCard
            type="Term"
            id={term.uid}
            fields={fields}
            data={term}
            submit={submit}
            headerAddon={<TagButton term={term} />}
          />
          <TagsCard id={term.uid} tags={term.tag} refreshTask={task} />
          <RelatedCard term={term} kind="translated_as" />
          <RelatedCard term={term} kind="definition" />
          <RelatedCard term={term} kind="in" />
          <RelatedCard term={term} kind="related" />
          <RelatedCard term={term} kind="synonym" />
          <RelatedCard term={term} kind="antonym" />
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
