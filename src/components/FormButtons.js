import React from 'react';
import { Button } from 'reactstrap';

export const SubmitButton = ({ formikProps, label = "Save" }) => {
  const { dirty, isSubmitting, handleSubmit } = formikProps;

  return (
    <Button type="submit" size="sm" color="primary" disabled={!dirty || isSubmitting} onClick={handleSubmit}>
      <i className="fa fa-dot-circle-o" /> <span>{label}</span>
    </Button>
  );
};

export const ResetButton = ({ formikProps }) => {
  const { dirty, isSubmitting, handleReset } = formikProps;

  return (
    <Button type="reset" size="sm" color="danger" disabled={!dirty || isSubmitting} onClick={handleReset}>
      <i className="fa fa-ban" /> Reset
    </Button>
  );
};
