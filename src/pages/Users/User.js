import React from 'react';
import { Col, Row } from 'reactstrap';
import { useFetch } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import DetailsCard from 'components/DetailsCard';

export const User = ({ user }) => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <DetailsCard item={user} />
        </Col>
      </Row>
    </div>
  );
};

export const ConnectedUser = () => {
  const task = useFetch(api.user.get);
  if (task.pending) {
    return <Loading />;
  }
  return <User user={task.result} />;
};

export default ConnectedUser;
