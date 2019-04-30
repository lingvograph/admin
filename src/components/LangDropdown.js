import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const langs = ['en', 'ru'];

const LangItem = ({ lang, onChange }) => {
  const handleClick = () => {
    onChange(lang);
  };
  return <DropdownItem onClick={handleClick}>{lang}</DropdownItem>;
};

const LangDropdown = ({ lang, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const items = ['any'].concat(langs).map((t, k) => <LangItem key={k} lang={t} onChange={onChange} />);
  return (
    <ButtonDropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret>{`Language: ${lang}`}</DropdownToggle>
      <DropdownMenu>{items}</DropdownMenu>
    </ButtonDropdown>
  );
};

export default LangDropdown;
