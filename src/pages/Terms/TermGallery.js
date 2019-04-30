import React from 'react';
import Gallery from 'react-grid-gallery';

const TermGallery = ({ term }) => {
  const images = (term.visual || []).map(t => ({
    src: t.url,
    thumbnail: t.url,
    caption: t.source,
  }));
  return <Gallery images={images} />;
};

export default TermGallery;
