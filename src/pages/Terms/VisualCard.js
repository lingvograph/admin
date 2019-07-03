import React, { useState } from 'react';
import { Badge, Button, Card, CardBody, CardHeader } from 'reactstrap';
import AddImageByURL from './AddImageByURL';
import TermGallery from './TermGallery';
import { confirm } from 'components';
import { useSaga } from 'hooks';
import * as api from 'api';

function useSelectImage(term) {
  const [selected, setSelected] = useState(new Set(), term);

  const onSelectImage = index => {
    const uid = term.visual[index].uid;
    const set = new Set([...selected]);
    if (set.has(uid)) {
      set.delete(uid);
    } else {
      set.add(uid);
    }
    setSelected(set);
  };

  return { selectedImages: selected, onSelectImage };
}

const VisualCard = ({ term }) => {
  const unlinkVisual = useSaga(api.file.unlinkVisual);
  const { selectedImages, onSelectImage } = useSelectImage(term);

  const unlinkSelectedImages = () => {
    confirm({
      content: 'Are you sure you want to unlink selected visual associations?',
      apply: () => unlinkVisual({ termId: term.uid, visual: [...selectedImages].map(uid => ({ uid })) }),
    });
  };

  return (
    <Card>
      <CardHeader>
        <strong>
          Visual <Badge color="info">{term.visualTotal}</Badge>
        </strong>
        <span className="ml-2">
          <AddImageByURL termId={term.uid} />
        </span>
        <span className="ml-2">
          <Button size="sm" onClick={() => unlinkSelectedImages()}>
            Unlink Selected
          </Button>
        </span>
      </CardHeader>
      <CardBody>
        <TermGallery term={term} selectedImages={selectedImages} onSelectImage={onSelectImage} />
      </CardBody>
    </Card>
  );
};

export default VisualCard;
