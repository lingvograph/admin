import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Table } from 'reactstrap';
import * as api from 'api';
import { useFetchList } from 'hooks';
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import SearchInput from 'components/SearchInput';
import LangFilter from './LangFilter';
import TagsFilter, { parseTags } from './TagsFilter';
import NewTermModal from './NewTermModal';

const TermRow = ({ term }) => {
  const termLink = `/terms/${term.uid}`;

  return (
    <tr key={term.uid}>
      <td>{term.lang}</td>
      <td>
        <Link to={termLink}>{term.text}</Link>
      </td>
      <td>{term.created_at}</td>
    </tr>
  );
};

const makeSearchParams = query => {
  return {
    lang: query.get('lang'),
    searchString: query.get('searchString'),
    tags: parseTags(query.get('tags')),
  };
};

// TODO show previous result

export const Terms = () => {
  const task = useFetchList(api.term.list, makeSearchParams, 500);
  const result = task.result || {};
  const { items = [], total = 0, limit = api.DEFAULT_LIMIT, page = 1 } = result;

  const rows = task.pending ? (
    <tr>
      <td colSpan={4}>
        <Loading />
      </td>
    </tr>
  ) : (
    items.map((term, index) => <TermRow key={index} term={term} />)
  );

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <div style={{ display: 'inline-block', width: 200 }}>
                <LangFilter />
              </div>
              <div style={{ display: 'inline-block', width: 250 }}>
                <SearchInput />
              </div>
              <div style={{ display: 'inline-block', width: 500, marginLeft: 50 }}>
                <TagsFilter />
              </div>
              <div style={{ display: 'inline-block', marginLeft: 50 }}>
                <NewTermModal />
              </div>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">lang</th>
                    <th scope="col">text</th>
                    <th scope="col">created</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </CardBody>
            <CardFooter className="flex-center">
              <Pagination page={page} total={total} limit={limit} />
              <div className="ml-2">Total: {total}</div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Terms;
