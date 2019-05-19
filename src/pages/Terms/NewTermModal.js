import React, { useState } from 'react';
import { Button } from 'reactstrap';
import FormModal from 'components/FormModal';
import { useSubmit, useNavigate } from 'hooks';
import * as api from 'api';

const fields = [
  {
    id: 'lang',
    type: 'lang',
  },
  {
    id: 'text',
  },
  {
    id: 'transcript',
    label: 'Transcription',
    type: 'multilang',
  },
];

const NewTermModal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const submit = useSubmit(api.term.create);

  const toggle = () => setIsOpen(!isOpen);

  const header = 'New Term';

  const data = {
    lang: 'en',
    text: '',
  };

  const handleResult = result => {
    navigate({ pathname: `/terms/${result.uid}` });
  };

  return (
    <React.Fragment>
      <Button onClick={toggle}>New Term</Button>
      <FormModal
        isOpen={isOpen}
        toggle={toggle}
        header={header}
        fields={fields}
        data={data}
        submit={submit}
        handleResult={handleResult}
      />
    </React.Fragment>
  );
};

export default NewTermModal;
