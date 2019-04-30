import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Table } from 'reactstrap';
import * as api from 'api';
import { useFetchList } from 'hooks';
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';

const TagRow = ({ tag }) => {
  const tagLink = `/tags/${tag.uid}`;

  return (
    <tr>
      <td>
        <Link to={tagLink}>{tag['text@en']}</Link>
      </td>
      <td>
        <Link to={tagLink}>{tag['text@ru']}</Link>
      </td>
      <td>{tag.created_at}</td>
      <td>{tag.created_by}</td>
    </tr>
  );
};

export const Tags = () => {
  const task = useFetchList(api.tag.list);
  const result = task.result || {};
  const { items = [], total = 0, limit = api.DEFAULT_LIMIT, page = 1 } = result;

  const rows = task.pending ? (
    <tr>
      <td colSpan={5}>
        <Loading />
      </td>
    </tr>
  ) : (
    items.map((tag, index) => <TagRow key={index} tag={tag} />)
  );

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Tags
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">text@en</th>
                    <th scope="col">text@ru</th>
                    <th scope="col">created_at</th>
                    <th scope="col">created_by</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
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

export default Tags;
