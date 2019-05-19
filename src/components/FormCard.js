import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Form } from 'reactstrap';
import { Formik } from 'formik';
import JSONButton from './JSONButton';
import { renderFields } from './FormFields';
import { SubmitButton, ResetButton } from './FormButtons';

const FormCard = ({ className, type, header, id, fields, data, submit, handleResult }) => {
  const onSubmit = async (values, actions) => {
    const result = await submit({ id, data: values });
    actions.setSubmitting(false);
    if (handleResult) {
      handleResult(result);
    }
  };

  if (!header) {
    header = (
      <span>
        <strong>{type}</strong>
        <small> {id}</small>
        <span className="ml-2">
          <JSONButton data={data} />
        </span>
      </span>
    );
  }

  return (
    <Formik initialValues={data} onSubmit={onSubmit}>
      {props => {
        const { handleSubmit } = props;

        const inputs = renderFields(fields, props);

        return (
          <Card>
            <CardHeader>{header}</CardHeader>
            <CardBody>
              <Form className={className} onSubmit={handleSubmit}>
                {inputs}
              </Form>
            </CardBody>
            <CardFooter>
              <SubmitButton formikProps={props} />
              <ResetButton formikProps={props} className="ml-2" />
            </CardFooter>
          </Card>
        );
      }}
    </Formik>
  );
};

export default FormCard;
