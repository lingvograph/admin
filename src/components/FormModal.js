import React from 'react';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import { renderFields } from './FormFields';
import { SubmitButton } from './FormButtons';

const FormModal = ({ className, header, id, fields, data, submit, isOpen, toggle, handleResult }) => {
  const onSubmit = async (values, actions) => {
    const result = await submit({ id, data: values });
    actions.setSubmitting(false);
    if (handleResult) {
      handleResult(result);
    }
  };

  return (
    <Formik initialValues={data} onSubmit={onSubmit}>
      {props => {
        const { handleSubmit } = props;

        const inputs = renderFields(fields, props);

        return (
          <Modal className={className} isOpen={isOpen} toggle={toggle}>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>
              <Form className={className} onSubmit={handleSubmit}>
                {inputs}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" size="sm" onClick={toggle}>
                Cancel
              </Button>
              <span> </span>
              <SubmitButton formikProps={props} />
            </ModalFooter>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default FormModal;
