import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table } from 'reactstrap';
import Moment from 'react-moment';
import * as api from 'api';
import { useFetch, useSearchParams } from 'hooks';
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import SearchInput from 'components/SearchInput';
import TagsInput from 'components/TagsInput';
import LangFilter from './LangFilter';
import TagsFilter, { parseTags } from './TagsFilter';
import NewTermModal from './NewTermModal';
import { createdBy } from 'utils';

const TermRow = ({ term }) => {
  return (
    <tr key={term.uid}>
      <td>{term.lang}</td>
      <td>
        <Link to={`/terms/${term.uid}`}>{term.text || term.uid}</Link>
      </td>
      <td>
        <div style={{ display: 'inline-block', minWidth: 100, maxWidth: 300 }}>
          <TagsInput tags={term.tag} />
        </div>
      </td>
      <td>
        <Moment date={term.created_at} fromNow />
      </td>
      <td>
        <span>{createdBy(term)}</span>
      </td>
    </tr>
  );
};

const makeSearchParams = query => {
  return {
    lang: query.get('lang'),
    searchString: query.get('searchString'),
    tags: parseTags(query.get('tags')),
    onlyTags: query.get('onlyTags') === 'true',
  };
};

// TODO show previous result

export const Terms = () => {
  const task = useFetch(api.term.list, makeSearchParams, 500);
  const { params, replaceParam } = useSearchParams(makeSearchParams);
  const result = task.result || {};
  const { items = [], total = 0, limit = api.DEFAULT_LIMIT, page = 1 } = result;

  const toggleOnlyTags = () => {
    if (params.onlyTags) {
      replaceParam('onlyTags', '');
    } else {
      replaceParam('onlyTags', 'true');
    }
  };

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
              <div style={{ display: 'inline-block', marginLeft: 10 }}>
                <Button color="info" active={params.onlyTags} onClick={toggleOnlyTags}>
                  Only Tags
                </Button>
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
                    <th scope="col">tags</th>
                    <th scope="col">created at</th>
                    <th scope="col">created by</th>
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

export default Terms;
