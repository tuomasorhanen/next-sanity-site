"use client";
import Card from './Card';
import { IGrid, ICard, IRefernceItem } from '../../_lib/types/types';
import BlogPost from '../ReferenceCards/BlogPosts';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { SwiperNavButtons } from '../SwiperNavButton';

SwiperCore.use([Navigation]);


interface GridSectionProps extends IGrid {}

const CardItem = (item: ICard) => {
  return <Card {...item} />;
};
const BlogItem = (item: IRefernceItem) => {
  return <BlogPost {...item} />;
};

const GridSection = (props: GridSectionProps) => {
  const { columns, items, style, marginTop } = props;
  const [columnStyles, setColumnStyles] = useState({});
  const [slidesPerView, setSlidesPerView] = useState(1);


  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let numColumns = 1;
    let slidesView = 1;

    if (screenWidth >= 1100) {
      numColumns = parseInt(columns.large);
      slidesView = numColumns;
    } else if (screenWidth >= 700) {
      numColumns = parseInt(columns.medium);
      slidesView = numColumns;
    } else {
      numColumns = parseInt(columns.small);
      slidesView = numColumns + 0.2;
    }
      setColumnStyles({ gridTemplateColumns: `repeat(${numColumns}, 1fr)` });
      setSlidesPerView(slidesView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [columns]);
  const itemsArray = Array.isArray(items) ? items : [items];

  const renderGridItem = (item: ICard | IRefernceItem) => {
    if (item._type === 'card') {
      return CardItem(item as ICard);
    } else if (item._type === 'post') {
      return BlogItem(item as IRefernceItem);
    } else {
      return <>Failed to load grid items</>;
    }
  };

  const marginTopClass = marginTop === 'small' ? 'mt-8' : 'mt-16';

  switch (style) {
    case 'carousel':
      return (
        <section className={marginTopClass}>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          style={{overflow: 'visible'}}
          spaceBetween={16}
          slidesPerView={slidesPerView}
          autoHeight={true}
          >
        {itemsArray.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <div>{renderGridItem(item)}</div>
              </SwiperSlide>
            ))}
            <div className='hidden sm:block'>
          <SwiperNavButtons />
          </div>
        </Swiper>
        </section>
      );
    case'default':
      return (
        <section key={props._key} className={marginTopClass}>
    <div className="grid gap-2 md:gap-4" style={columnStyles}>
      {itemsArray.map((item, index) => (
        <figure key={item._id || index}>{renderGridItem(item)}</figure>
      ))}
    </div>
  </section>
      );
    default:
      return <></>;
};
};

export default GridSection;
