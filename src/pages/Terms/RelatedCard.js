import React, { useState } from 'react';
import { Badge, Card, CardBody, CardHeader, Button } from 'reactstrap';
import TermAutocomplete from 'components/TermAutocomplete';
import TermList from './TermList';
import { useSaga } from 'hooks';
import * as api from 'api';
import { relationMap } from 'termquery';

const RelatedCard = ({ term, kind }) => {
  const [related, setRelated] = useState({ text: '', lang: '', uid: '' });
  const linkRelated = useSaga(api.term.linkRelated);

  const handleAdd = () => {
    linkRelated({ termId: term.uid, id: related.uid, kind });
  };

  const rel = relationMap[kind];

  return (
    <Card>
      <CardHeader>
        <strong>
          {rel.label} <Badge color="info">{term[rel.count]}</Badge>
        </strong>
      </CardHeader>
      <CardBody>
        <div className="flex mb-2">
          <TermAutocomplete value={related} onChange={setRelated} except={term[kind]} />
          <Button className="ml-2" size="sm" onClick={handleAdd} disabled={!related.uid}>
            Add
          </Button>
        </div>
        <TermList term={term} kind={kind} />
      </CardBody>
    </Card>
  );
};

export default RelatedCard;
