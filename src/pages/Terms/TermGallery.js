import React from 'react';
import Gallery from 'react-grid-gallery';

const TermGallery = ({ term, selectedImages, onSelectImage }) => {
  const images = (term.visual || []).map(t => ({
    uid: t.uid,
    src: t.url,
    thumbnail: t.url,
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: t.source,
    isSelected: selectedImages.has(t.uid),
  }));

  return <Gallery images={images} onSelectImage={onSelectImage} />;
};

export default TermGallery;
