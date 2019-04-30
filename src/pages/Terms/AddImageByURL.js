import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, FormGroup, FormText, Input } from 'reactstrap';
import { useSubmit } from 'hooks';
import * as api from 'api';

const AddByURL = ({ termId, refreshTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const submit = useSubmit(api.term.addVisualURL, refreshTask);

  const toggle = () => setIsOpen(!isOpen);
  const handleChange = e => setUrl(e.target.value);
  const save = async () => {
    await submit({ id: termId, url });
    toggle();
  };

  return (
    <React.Fragment>
      <Button onClick={toggle}>Add by URL</Button>
      <Modal className="modal-lg" isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Add by URL</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Col xs="12" md="9">
              <Input type="text" placeholder="Paste URL of image..." value={url} onChange={handleChange} />
              <FormText>Only select images that you have confirmed that you have the license to use.</FormText>
            </Col>
          </FormGroup>
          <div className="flex-center">
            {url ? <img src={url} alt="visual associated with given term" style={{ maxWidth: 400 }} /> : null}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{' '}
          <Button color="primary" onClick={save}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AddByURL;
