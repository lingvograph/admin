import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useLocation, useSearchParams } from 'hooks';

const langs = ['any', 'en', 'ru'];

const LangItem = ({ lang }) => {
  const { params, replaceParams } = useSearchParams();
  const handleClick = () => {
    if (lang === 'any') {
      params.delete('lang');
    } else {
      params.set('lang', lang);
    }
    replaceParams(params);
  };
  return <DropdownItem onClick={handleClick}>{lang}</DropdownItem>;
};

const LangFilter = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lang = params.get('lang') || 'any';
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const items = langs.map((t, k) => <LangItem key={k} lang={t} />);
  return (
    <ButtonDropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret>{lang}</DropdownToggle>
      <DropdownMenu right>{items}</DropdownMenu>
    </ButtonDropdown>
  );
};

export default LangFilter;
