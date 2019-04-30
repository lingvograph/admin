import React from 'react';
import { Col, Row } from 'reactstrap';
import { useFetchItem, useSubmit } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import FormCard from 'components/FormCard';

const fields = [
  {
    id: 'text',
    label: 'Text',
    type: 'multilang',
  },
  {
    id: 'description',
    label: 'Description',
    type: 'multilang',
  },
];

export const Tag = () => {
  const task = useFetchItem(api.tag.get);
  const submit = useSubmit(api.tag.update, task);

  if (task.pending) {
    return <Loading />;
  }

  const tag = task.result;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6">
          <FormCard type="Tag" id={tag.uid} fields={fields} data={tag} submit={submit} />
        </Col>
      </Row>
    </div>
  );
};

export default Tag;
