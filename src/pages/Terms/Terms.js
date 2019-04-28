import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Table,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import * as api from 'api';
import { useDispatch } from 'redux-react-hook';
import { replace } from 'connected-react-router';
import { useFetchList, useLocation } from 'hooks';
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import SearchInput from 'components/SearchInput';

const langs = ['any', 'en', 'ru'];

const LangItem = ({ lang }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (lang === 'any') {
      params.delete('lang');
    } else {
      params.set('lang', lang);
    }
    dispatch(replace({
      pathname: location.pathname,
      search: params.toString(),
    }));
  };
  return (
    <DropdownItem onClick={handleClick}>{lang}</DropdownItem>
  );
};

const LangFilter = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lang = params.get('lang') || 'any';
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const items = langs.map((t, k) => <LangItem key={k} lang={t}/>);
  return (
    <ButtonDropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret>
        {lang}
      </DropdownToggle>
      <DropdownMenu right>
        {items}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

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

const makeSearchParams = (query) => {
  return {
    lang: query.get('lang'),
    searchString: query.get('searchString')
  };
};

// TODO show previous result

export const Terms = ({}) => {
  const task = useFetchList(api.term.list, makeSearchParams, 500);
  const result = task.result || {};
  const { items = [], total = 0, limit = api.DEFAULT_LIMIT, page = 1 } = result;

  const rows = task.pending ? (
    <tr>
      <td colSpan={4}><Loading/></td>
    </tr>
  ) : items.map((term, index) => (
    <TermRow key={index} term={term}/>
  ));

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"/>
              <div style={{ display: 'inline-block', width: 200 }}>
                Language <LangFilter/>
              </div>
              <div style={{ display: 'inline-block', width: 200 }}>
                <SearchInput/>
              </div>
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
                {rows}
                </tbody>
              </Table>
            </CardBody>
            <CardFooter className="flex-center">
              <Pagination page={page} total={total} limit={limit}/>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Terms;
