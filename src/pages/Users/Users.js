import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, CardFooter, Col, Row, Table } from 'reactstrap';
import * as api from 'api';
import { useFetch } from 'hooks';
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import { gravatarURL } from 'utils';
import Moment from 'react-moment';

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
  const avatar = user.avatar || gravatarURL(user.email);

  return (
    <tr key={user.uid}>
      <td>
        <Link to={userLink}>
          <img
            className="img-avatar"
            src={avatar}
            alt={user.email}
            width={35}
            height={35}
            style={{ margin: '0 10px' }}
          />
          <span>{name}</span>
        </Link>
      </td>
      <td>{user.email}</td>
      <td>{user.registered_at ? <Moment date={user.registered_at} fromNow /> : null}</td>
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
  const task = useFetch(api.user.list);
  const result = task.result || {};
  const { items = [], total = 0, limit = api.DEFAULT_LIMIT, page = 1 } = result;

  const rows = task.pending ? (
    <tr>
      <td colSpan={5}>
        <Loading />
      </td>
    </tr>
  ) : (
    items.map((user, index) => <UserRow key={index} user={user} />)
  );

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Users
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">registered</th>
                    <th scope="col">role</th>
                    <th scope="col">status</th>
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

export default Users;
