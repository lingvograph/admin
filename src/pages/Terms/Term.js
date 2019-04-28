import React from 'react';
import { Col, Row } from 'reactstrap';
import { useFetchItem, useSubmit } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import FormCard from 'components/FormCard';
import TagsCard from 'components/TagsCard';

const fields = [
  {
    id: 'lang',
  },
  {
    id: 'text',
  },
  {
    id: 'transcript@en',
  },
  {
    id: 'transcript@ru',
  },
];

export const Term = () => {
  const task = useFetchItem(api.term.get);
  const submit = useSubmit(api.term.update, task);

  if (task.pending) {
    return <Loading/>;
  }
  const term = task.result;

  const header = (
    <span>
      <strong>Term</strong>
      <small> {term.uid}</small>
    </span>
  );

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <FormCard header={header}
                    id={term.uid}
                    fields={fields}
                    data={term}
                    submit={submit}
          />
        </Col>
        <Col lg={6}>
          <TagsCard id={term.uid} tags={term.tag} refreshTask={task}/>
        </Col>
      </Row>
    </div>
  );
};

export default Term;
