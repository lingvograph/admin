import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const langs = ['en', 'ru'];

const LangItem = ({ lang, onChange }) => {
  const handleClick = () => {
    onChange(lang);
  };
  return <DropdownItem onClick={handleClick}>{lang}</DropdownItem>;
};

const LangDropdown = ({ value, onChange, withAny, label = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const items = [withAny ? 'any' : undefined]
    .filter(t => !!t)
    .concat(langs)
    .map((t, k) => <LangItem key={k} lang={t} onChange={onChange} />);
  return (
    <ButtonDropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret>{`${label}${value}`}</DropdownToggle>
      <DropdownMenu>{items}</DropdownMenu>
    </ButtonDropdown>
  );
};

export default LangDropdown;
