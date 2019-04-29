import React from 'react';
import { Col, Row, Card, CardHeader, CardBody } from 'reactstrap';
import JSONView from 'react-json-view';
import { useFetchItem, useSubmit } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import FormCard from 'components/FormCard';
import TagsCard from 'components/TagsCard';
import TermGallery from './TermGallery';

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
          <FormCard header={header} id={term.uid} fields={fields} data={term} submit={submit} />
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
            </CardHeader>
            <CardBody>
              <TermGallery term={term}/>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <strong>JSON</strong>
            </CardHeader>
            <CardBody>
              <JSONView src={term} displayDataTypes={false}/>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Term;
