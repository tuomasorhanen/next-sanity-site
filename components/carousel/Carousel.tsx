import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import CustomImage from '../CustomImage';
import { ICarousel } from '../../_lib/types/types';
import { Content } from '../Content';


const CarouselComponent = (props: ICarousel) => {
  const { carouselItems, opacity } = props;
  const opacityStyle = opacity ? { opacity: opacity / 100 } : {};


  const renderCarouselItems = () => {
    return carouselItems.map((item: any, index: number) => (
    <div
      key={index}
      className="relative flex h-full items-center justify-center p-12" 
>
  <div style={opacityStyle}>
      {item.image?.asset && (
        <CustomImage
          {...item?.image}
          className="absolute inset-0 h-full w-full object-cover"
          alt={item.image.alt}
          width={1280}
          />
      )}
      </div>
      <div className="relative z-10 max-w-4xl">
        <Content {...item} />
      </div>
    </div>
    ));
  };
  
  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 ml-3 p-2 transition-colors duration-300 ease-in-out text-bg rounded-full hover:bg-accent hover:text-white lg:ml-5">
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
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 mr-3 p-2 transition-colors duration-300 ease-in-out text-bg rounded-full hover:bg-accent hover:text-white lg:mr-5">
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
    );
  const renderIndicator = (onClickHandler, isSelected, index, label) => {
    if (isSelected) {
      return (
        <li className="mr-3 inline-block">
          <button
            className="block h-3 w-3 rounded-full bg-accent text-accent"
            onClick={onClickHandler}
            aria-label={`Slide ${index + 1}`}></button>
        </li>
      );
    }
    return (
      <li className="mr-3 inline-block">
        <button
          className="block h-3 w-3 rounded-full bg-white text-accent"
          onClick={onClickHandler}
          aria-label={`Slide ${index + 1}`}></button>
      </li>
    );
  };

  
 return (
  <section key={props._id} className="col-span-12 mt-8 sm:mt-16">
  <Carousel
    showThumbs={false}
    showStatus={false}
    infiniteLoop={true}
    renderArrowPrev={renderArrowPrev}
    renderArrowNext={renderArrowNext}
    renderIndicator={renderIndicator}
    className="overflow-hidden rounded-app shadow-app bg-black">
    {renderCarouselItems()}
  </Carousel>
</section>
  );
};

export default CarouselComponent;
