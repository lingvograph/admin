import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import JSONView from 'react-json-view';

const JSONButton = ({data, ...props}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Button size="sm" outline={true} onClick={toggle} {...props}>JSON</Button>
      <Modal className="modal-lg" isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>JSON View</ModalHeader>
        <ModalBody>
          <JSONView src={data} displayDataTypes={false}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default JSONButton;
