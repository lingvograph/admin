import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import * as api from 'api';
import { useDataList } from 'hooks';
import Pagination from 'components/Pagination';

const UserRow = ({ user }) => {
  const userLink = `/users/${user.uid}`;

  const getBadge = status => {
    switch ((status || '').toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'warning';
      case 'banned':
        return 'danger';
      default:
        return 'primary';
    }
  };

  return (
    <tr key={user.uid}>
      <th scope="row">
        <Link to={userLink}>{user.uid}</Link>
      </th>
      <td>
        <Link to={userLink}>{user.name}</Link>
      </td>
      <td>{user.registered_at}</td>
      <td>{user.role}</td>
      <td>
        <Link to={userLink}>
          <Badge color={getBadge(user.status)}>{user.status}</Badge>
        </Link>
      </td>
    </tr>
  );
};

export const Users = ({ items, total, limit = api.DEFAULT_LIMIT, page = 1 }) => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Users <small className="text-muted">example</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">registered</th>
                    <th scope="col">role</th>
                    <th scope="col">status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((user, index) => (
                    <UserRow key={index} user={user} />
                  ))}
                </tbody>
              </Table>
            </CardBody>
            <Pagination page={page} total={total} limit={limit} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export const ConnectedUsers = () => {
  const data = useDataList(api.user.list);
  return <Users {...data} />;
};

export default ConnectedUsers;
