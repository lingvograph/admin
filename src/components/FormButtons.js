import React from 'react';
import { Button } from 'reactstrap';

export const SubmitButton = ({ formikProps, label = 'Save', ...buttonProps }) => {
  const { dirty, isSubmitting, handleSubmit } = formikProps;

  return (
    <Button
      color="primary"
      size="sm"
      {...buttonProps}
      type="submit"
      disabled={!dirty || isSubmitting}
      onClick={handleSubmit}
    >
      <span>{label}</span>
    </Button>
  );
};

export const ResetButton = ({ formikProps, label = 'Reset', ...buttonProps }) => {
  const { dirty, isSubmitting, handleReset } = formikProps;

  return (
    <Button
      color="danger"
      size="sm"
      {...buttonProps}
      type="reset"
      disabled={!dirty || isSubmitting}
      onClick={handleReset}
    >
      <span>{label}</span>
    </Button>
  );
};
