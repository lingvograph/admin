import React, { useState } from 'react';
import { Badge, Card, CardBody, CardHeader, Button } from 'reactstrap';
import TermAutocomplete from 'components/TermAutocomplete';
import TranslationList from './TranslationList';
import { useSaga } from 'hooks';
import * as api from 'api';

const TranslationCard = ({ term }) => {
  const [translation, setTranslation] = useState({ text: '', lang: '', uid: '' });
  const linkTranslation = useSaga(api.term.linkTranslation);

  const handleAdd = () => {
    linkTranslation({ termId: term.uid, id: translation.uid });
  };

  return (
    <Card>
      <CardHeader>
        <strong>
          Translations <Badge color="info">{term.translationTotal}</Badge>
        </strong>
      </CardHeader>
      <CardBody>
        <div className="flex mb-2">
          <TermAutocomplete value={translation} onChange={setTranslation} except={term.translated_as} />
          <Button className="ml-2" size="sm" onClick={handleAdd} disabled={!translation.uid}>
            Add
          </Button>
        </div>
        <TranslationList term={term} />
      </CardBody>
    </Card>
  );
};

export default TranslationCard;
