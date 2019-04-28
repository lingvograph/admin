import React from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { Formik } from 'formik';

const FormCard = ({ className, header, id, fields, data, submit }) => {
  const onSubmit = async (values, actions) => {
    await submit({ id, data: values });
    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={data} onSubmit={onSubmit}>
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;

        // TODO support inline field group
        const inputs = fields.map((field, idx) => {
          const label = field.label || field.id;
          const isTouched = touched[field.id];
          const error = isTouched && errors[field.id];
          const inputProps = {
            type: field.type || 'text',
            id: field.id,
            name: field.name,
            placeholder: field.placeholder,
            value: values[field.id],
            onChange: handleChange,
            onBlur: handleBlur,
            valid: isTouched ? !error : undefined,
          };
          return (
            <FormGroup row key={idx}>
              <Col md="3">
                <Label htmlFor={field.id}>{label}</Label>
              </Col>
              <Col xs="12" md="9">
                <Input {...inputProps} />
                {field.help ? <FormText color="muted">{field.help}</FormText> : null}
                {error ? <FormFeedback>{error}</FormFeedback> : null}
              </Col>
            </FormGroup>
          );
        });

        return (
          <Card>
            <CardHeader>{header}</CardHeader>
            <CardBody>
              <Form className={className} onSubmit={handleSubmit}>
                {inputs}
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" disabled={!dirty || isSubmitting} onClick={handleSubmit}>
                <i className="fa fa-dot-circle-o" /> Submit
              </Button>
              <Button type="reset" size="sm" color="danger" disabled={!dirty || isSubmitting} onClick={handleReset}>
                <i className="fa fa-ban" /> Reset
              </Button>
            </CardFooter>
          </Card>
        );
      }}
    </Formik>
  );
};

export default FormCard;
