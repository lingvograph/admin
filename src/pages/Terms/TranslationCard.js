import React, { useState } from 'react';
import { Badge, Card, CardBody, CardHeader, Button } from 'reactstrap';
import TermAutocomplete from 'components/TermAutocomplete';
import TranslationList from './TranslationList';

const TranslationCard = ({ term }) => {
  const [translation, setTranslation] = useState({ text: '', lang: '', uid: '' });

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
          <Button className="ml-2" size="sm">
            Add
          </Button>
        </div>
        <TranslationList term={term} />
      </CardBody>
    </Card>
  );
};

export default TranslationCard;
