import React, { useState, useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { call } from 'redux-saga/effects';
import { isGeneratorFunction } from 'utils';
import store from '../store';

const Confirm = ({ className, title, content, okLabel, cancelLabel, apply, container }) => {
  const [isOpen, setIsOpen] = useState(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleOk = () => {
    new Promise(resolve => {
      let fn = apply;
      let args = [];
      if (Array.isArray(apply)) {
        fn = apply[0];
        args = apply.slice(1);
      }
      if (isGeneratorFunction(fn)) {
        store.runSaga(function*() {
          const result = yield call(fn, ...args);
          resolve(result);
        });
      } else {
        resolve(fn(...args));
      }
    }).then(close);
  };

  useEffect(() => {
    return () => {
      if (container) {
        unmountComponentAtNode(container);
      }
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>{title || 'Confirmation'}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleOk}>
          {okLabel || 'OK'}
        </Button>
        &nbsp;
        <Button color="secondary" onClick={toggle}>
          {cancelLabel || 'Cancel'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export function confirm(props) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(<Confirm {...props} container={container} />, container);
}
