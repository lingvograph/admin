import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {useFetchItem} from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';

export const User = ({ user }) => {
  const details = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]];

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <strong><i className="icon-info pr-1"></i>User id: {user ? user.uid : 'undefined'}</strong>
            </CardHeader>
            <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {
                      details.map(([key, value]) => {
                        return (
                          <tr key={key}>
                            <td>{`${key}:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export const ConnectedUser = () => {
  const task = useFetchItem(api.user.get);
  if (task.pending) {
    return <Loading/>;
  }
  return <User user={task.result}/>;
};

export default ConnectedUser;
