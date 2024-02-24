'use client';
import React, { useEffect,useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { ICarousel } from '../../_lib/types/types';
import ButtonRenderer from '../ButtonRenderer';
import CustomImage from '../CustomImage';

const CarouselComponent = (props: ICarousel) => {
  const { carouselItems, carouselTextColor } = props;

  const textStyle = carouselTextColor ? { color: carouselTextColor.hex } : {};
  const renderButtons = () =>
    currentItem.buttons?.map(btn => <ButtonRenderer key={`${btn.callToAction}`} _ref={btn._ref} />);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBouncing, setIsBouncing] = useState(true);
  const [animationDirection, setAnimationDirection] = useState<null | 'next' | 'prev'>(null);

  const nextIndex = () => {
    setCurrentIndex((currentIndex + 1) % carouselItems.length);
    setAnimationDirection('next');
    setIsBouncing(false);
  };

  const prevIndex = () => {
    setCurrentIndex((currentIndex - 1 + carouselItems.length) % carouselItems.length);
    setAnimationDirection('prev');
    setIsBouncing(false);
  };

  const prevItemIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  const nextItemIndex = (currentIndex + 1) % carouselItems.length;
  const currentItem = carouselItems[currentIndex];
  const prevItem = carouselItems[prevItemIndex];
  const nextItem = carouselItems[nextItemIndex];
  const thumbnails = [...carouselItems.slice(currentIndex + 1), ...carouselItems.slice(0, currentIndex)];

  useEffect(() => {
    const handleScroll = () => {
      setIsBouncing(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (animationDirection !== null) {
      const timer = setTimeout(() => {
        setAnimationDirection(null);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [animationDirection]);

  return (
    <div className={`carousel ${animationDirection}`}>
      <div className="list">
        <div key={currentItem._key} className="item">
          <CustomImage {...currentItem.image} alt={currentItem.title} width={1280} className="" />
          <div className="content" style={textStyle}>
            <p className="title text-4xl font-bold md:text-6xl">{currentItem.title}</p>
            <p className="des mt-4 max-w-xl text-lg">{currentItem.description}</p>
            <nav className="flex flex-shrink items-center justify-center space-x-4 md:-ml-2 md:justify-start">
              {renderButtons()}
            </nav>
          </div>
        </div>
        {animationDirection === 'prev' ? (
          <div key={nextItem._key} className="item">
            <CustomImage {...nextItem.image} alt={nextItem.title} width={1280} className="" />
            <div className="content" style={textStyle}>
              <p className="title text-4xl font-bold md:text-6xl">{nextItem.title}</p>
              <p className="des mt-4 max-w-xl text-lg">{nextItem.description}</p>
            </div>
          </div>
        ) : (
          <div key={prevItem._key} className="item">
            <CustomImage {...prevItem.image} alt={prevItem.title} width={1280} className="" />
            <div className="content" style={textStyle}>
              <p className="title text-4xl font-bold md:text-6xl">{prevItem.title}</p>
              <p className="des mt-4 max-w-xl text-lg">{prevItem.description}</p>
            </div>
          </div>
        )}
      </div>
      <div className="thumbnail">
        {thumbnails.map(item => (
          <div key={item._key} className="item bg-gradient-to-b from-transparent via-black to-black">
            <CustomImage {...item.image} alt={item.title} width={160} aspectRatio={15 / 22} className=" opacity-70" />

            <div className="content">
              <p className="title">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button
          onClick={prevIndex}
          className="prev z-20 rounded-full bg-accent text-white transition duration-300 hover:scale-125">
          <BiChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={nextIndex}
          className={`next z-20 rounded-full bg-accent text-white transition duration-300 hover:scale-125 ${
            isBouncing ? 'bounce' : ''
          }`}>
          <BiChevronRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
