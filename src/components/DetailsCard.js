import _ from 'lodash';
import React from 'react';
import { Card, CardBody, CardHeader, Table, ListGroup, ListGroupItem } from 'reactstrap';

// TODO render collapsible property grid

const notFound = () => <span><i className="text-muted icon-ban"></i> Not found</span>;

function renderValue(value) {
  if (Array.isArray(value)) {
    const items = value.map((t, k) => (
      <ListGroupItem key={k}>
        {renderValue(t)}
      </ListGroupItem>
    ));
    return (
      <ListGroup>
        {items}
      </ListGroup>
    );
  }
  if (_.isObject(value)) {
    const details = Object.entries(value);
    return (
      <Table responsive striped hover>
        <tbody>
        {
          details.map(([key, value]) => {
            return (
              <tr key={key}>
                <td>{`${key}:`}</td>
                <td>{renderValue(value)}</td>
              </tr>
            );
          })
        }
        </tbody>
      </Table>
    );
  }
  return <strong>{value}</strong>;
}

const Details = ({ item }) => {
  const details = item ? Object.entries(item) : [['id', notFound()]];

  return (
    <Card>
      <CardHeader>
        <strong><i className="icon-info pr-1"></i>ID: {item ? item.uid : 'undefined'}</strong>
      </CardHeader>
      <CardBody>
        <Table responsive striped hover>
          <tbody>
          {
            details.map(([key, value]) => {
              return (
                <tr key={key}>
                  <td>{`${key}:`}</td>
                  <td>{renderValue(value)}</td>
                </tr>
              );
            })
          }
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
};

export default Details;
