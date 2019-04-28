import React from 'react';
import { Col, Row } from 'reactstrap';
import { useFetchItem, useSubmit } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import FormCard from 'components/FormCard';

const fields = [
  {
    id: 'text@en',
  },
  {
    id: 'text@ru',
  },
];

export const Tag = () => {
  const task = useFetchItem(api.tag.get);
  const submit = useSubmit(api.tag.update, task);

  if (task.pending) {
    return <Loading />;
  }

  const tag = task.result;

  const header = (
    <span>
      <strong>Tag</strong>
      <small> Form</small>
    </span>
  );

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6">
          <FormCard header={header} id={tag.uid} fields={fields} data={tag} submit={submit} />
        </Col>
      </Row>
    </div>
  );
};

export default Tag;
