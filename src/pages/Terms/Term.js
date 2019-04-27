import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {useFetchItem} from 'hooks';
import * as api from 'api';
import Loading from 'components/Loading';

const Term  = ({ term }) => {
  const details = term ? Object.entries(term) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <strong><i className="icon-info pr-1"></i>User id: {term ? term.uid : 'undefined'}</strong>
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
  );
};

export const ConnectedTerm = () => {
  const task = useFetchItem(api.term.get);
  if (task.pending) {
    return <Loading/>;
  }
  return <Term term={task.result}/>;
};

export default ConnectedTerm;
