import React from 'react';
import { Col, Row } from 'reactstrap';
import { useFetchItem } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import DetailsCard from 'components/DetailsCard';

const Term = ({ term }) => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <DetailsCard item={term} />
        </Col>
      </Row>
    </div>
  );
};

export const ConnectedTerm = () => {
  const task = useFetchItem(api.term.get);
  if (task.pending) {
    return <Loading />;
  }
  return <Term term={task.result} />;
};

export default ConnectedTerm;
