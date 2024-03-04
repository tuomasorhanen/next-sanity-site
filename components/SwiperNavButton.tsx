import React from 'react';
import { useSwiper } from 'swiper/react';


export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className='flex justify-center gap-2 mt-2'>
        <button
        type="button"
        onClick={() => swiper.slidePrev()}        
        title="prev"
        className="z-10 p-1 text-bg rounded-full bg-accent transition-scale">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
          >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => swiper.slideNext()}
        title="next"
        className="z-10 p-1 text-bg rounded-full bg-accent transition-scale">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
          >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
