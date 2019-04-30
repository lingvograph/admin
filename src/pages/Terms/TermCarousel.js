import React, { useState } from 'react';
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';

const Slider = ({ term }) => {
  const items = term.visual || [];
  const [animating, setAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const onExiting = () => setAnimating(true);
  const onExited = () => setAnimating(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goto = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const caption = term.text;
  const slides = items.map(item => {
    return (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={item.uid}>
        <img className="d-block w-100" src={item.url} alt={item.alt} />
        <CarouselCaption captionText={term.text} captionHeader={caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={prev}>
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goto} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={prev} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
};

export default Slider;
