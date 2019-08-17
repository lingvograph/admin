import _ from 'lodash';
import React from 'react';
import { Col, FormFeedback, FormGroup, FormText, Input } from 'reactstrap';
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
  const value = values[field.id];
  const inputProps = {
    type: field.type || 'text',
    id: field.id,
    name: field.id,
    placeholder: field.placeholder,
    value: _.isNil(value) ? '' : value,
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
      value: values[fieldId] || '',
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

export function renderFields(fields, formikProps) {
  return fields.map(field => {
    switch (field.type) {
      case 'lang':
        return <LangField key={field.id} field={field} formikProps={formikProps} />;
      case 'multilang':
        return <MultiLangField key={field.id} field={field} formikProps={formikProps} />;
      default:
        return <SimpleField key={field.id} field={field} formikProps={formikProps} />;
    }
  });
}
