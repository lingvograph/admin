import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, CardFooter, Col, Row, Table } from 'reactstrap';
import * as api from 'api';
import { useFetchList } from 'hooks';
import Loading from 'components/Loading';
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

  const fullName = [user.first_name, user.last_name].filter(t => !!t).join(' ');
  const name = fullName || user.name;

  return (
    <tr key={user.uid}>
      <th scope="row">
        <Link to={userLink}>{user.uid}</Link>
      </th>
      <td>
        <Link to={userLink}>{name}</Link>
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

export const Users = () => {
  const task = useFetchList(api.user.list);
  const result = task.result || {};
  const { items = [], total = 0, limit = api.DEFAULT_LIMIT, page = 1 } = result;

  const rows = task.pending ? (
    <tr>
      <td colSpan={5}><Loading/></td>
    </tr>
  ) : items.map((user, index) => (
    <UserRow key={index} user={user} />
  ));

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Users
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
                  {rows}
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

export default Users;
