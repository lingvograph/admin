import React from 'react';
import { Col, Row, Card, CardHeader, CardBody } from 'reactstrap';
import { useFetchItem, useSubmit } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import FormCard from 'components/FormCard';
import TagsCard from 'components/TagsCard';
import TermGallery from './TermGallery';
import AddImageByURL from './AddImageByURL';

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
    return <Loading />;
  }
  const term = task.result;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <FormCard type="Term" id={term.uid} fields={fields} data={term} submit={submit} />
        </Col>
        <Col lg={6}>
          <TagsCard id={term.uid} tags={term.tag} refreshTask={task} />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
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
      </Row>
    </div>
  );
};

export default Term;
