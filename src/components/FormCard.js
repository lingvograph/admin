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
  Input,
  Button,
} from 'reactstrap';
import { Formik } from 'formik';
import JSONButton from './JSONButton';
import LangDropdown, { langs } from './LangDropdown';

const FieldLabel = ({ field }) => {
  const label = field.label || field.id;
  return (
    <Col md="3">
      <span>{label}</span>
    </Col>
  );
};

const FieldFeedback = ({ field, formikProps }) => {
  const { touched, errors } = formikProps;
  const isTouched = touched[field.id];
  const error = isTouched && errors[field.id];

  return (
    <React.Fragment>
      {field.help ? <FormText color="muted">{field.help}</FormText> : null}
      {error ? <FormFeedback>{error}</FormFeedback> : null}
    </React.Fragment>
  );
};

const SimpleField = ({ field, formikProps }) => {
  const { values, touched, errors, handleChange, handleBlur } = formikProps;

  const isTouched = touched[field.id];
  const error = isTouched && errors[field.id];
  const inputProps = {
    type: field.type || 'text',
    id: field.id,
    name: field.id,
    placeholder: field.placeholder,
    value: values[field.id],
    onChange: handleChange,
    onBlur: handleBlur,
    valid: isTouched ? !error : undefined,
  };

  return (
    <FormGroup className="flex-center" row>
      <FieldLabel field={field} />
      <Col xs="12" md="9">
        <Input {...inputProps} />
        <FieldFeedback field={field} formikProps={formikProps} />
      </Col>
    </FormGroup>
  );
};

const LangField = ({ field, formikProps }) => {
  const { values, setFieldValue } = formikProps;

  const value = values[field.id];

  const handleChange = val => {
    setFieldValue(field.id, val);
  };

  return (
    <FormGroup className="flex-center" row>
      <FieldLabel field={field} />
      <Col xs="12" md="9">
        <LangDropdown value={value} onChange={handleChange} />
        <FieldFeedback field={field} formikProps={formikProps} />
      </Col>
    </FormGroup>
  );
};

const MultiLangField = ({ field, formikProps }) => {
  const { values, handleChange, handleBlur } = formikProps;

  const label = field.label || field.id;
  const fieldInputs = langs.map(lang => {
    const fieldId = `${field.id}@${lang}`;
    const inputProps = {
      type: 'text',
      id: fieldId,
      name: fieldId,
      value: values[fieldId],
      onChange: handleChange,
      onBlur: handleBlur,
    };
    return (
      <FormGroup className="flex-center" row key={lang}>
        <Col xs="1">
          <span>{lang}</span>
        </Col>
        <Col xs="11">
          <Input {...inputProps} />
        </Col>
      </FormGroup>
    );
  });

  return (
    <React.Fragment>
      <FormGroup className="flex-center" row>
        <Col xs="12">
          <div className="hr-heading">
            <span>{label}</span>
            <span className="hr" />
          </div>
        </Col>
      </FormGroup>
      {fieldInputs}
    </React.Fragment>
  );
};

const FormCard = ({ className, type, header, id, fields, data, submit }) => {
  const onSubmit = async (values, actions) => {
    await submit({ id, data: values });
    actions.setSubmitting(false);
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
        const { dirty, isSubmitting, handleSubmit, handleReset } = props;

        // TODO support inline field group
        const inputs = fields.map((field, idx) => {
          switch (field.type) {
            case 'lang':
              return <LangField key={field.id} field={field} formikProps={props} />;
            case 'multilang':
              return <MultiLangField key={field.id} field={field} formikProps={props} />;
            default:
              return <SimpleField key={field.id} field={field} formikProps={props} />;
          }
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
