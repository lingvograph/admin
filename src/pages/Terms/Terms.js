import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Table } from 'reactstrap';
import * as api from 'api';
import { useFetchList } from 'hooks';
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';

const TermRow = ({ term }) => {
  const termLink = `/terms/${term.uid}`;

  return (
    <tr key={term.uid}>
      <th scope="row">
        <Link to={termLink}>{term.uid}</Link>
      </th>
      <td>{term.lang}</td>
      <td>
        <Link to={termLink}>{term.text}</Link>
      </td>
      <td>{term.created_at}</td>
    </tr>
  );
};

export const Terms = ({ items, total, limit = api.DEFAULT_LIMIT, page = 1 }) => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Terms
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">lang</th>
                    <th scope="col">text</th>
                    <th scope="col">created</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((term, index) => (
                    <TermRow key={index} term={term} />
                  ))}
                </tbody>
              </Table>
            </CardBody>
            <CardFooter className="flex-center">
              <Pagination page={page} total={total} limit={limit} />
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export const ConnectedTerms = () => {
  const task = useFetchList(api.term.list);
  if (task.pending) {
    return <Loading/>;
  }
  return <Terms {...task.result} />;
};

export default ConnectedTerms;
