import React from 'react';
import { Col, Row } from 'reactstrap';
import { useFetchItem } from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';
import DetailsCard from 'components/DetailsCard';

export const Tag = ({ tag }) => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <DetailsCard item={tag}/>
        </Col>
      </Row>
    </div>
  )
};

export const ConnectedTag = () => {
  const task = useFetchItem(api.tag.get);
  if (task.pending) {
    return <Loading/>;
  }
  return <Tag tag={task.result}/>;
};

export default ConnectedTag;
