import React from 'react';
import { Col, Row } from 'reactstrap';
import { useFetchItem, useSubmit } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import FormCard from 'components/FormCard';

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
      </Row>
    </div>
  );
};

export default Term;
