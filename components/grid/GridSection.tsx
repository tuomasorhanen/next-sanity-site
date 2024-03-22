"use client";
import Card from './Card';
import { IGrid, ICard, IRefernceItem, IGroup } from '../../_lib/types/types';
import BlogPost from '../ReferenceCards/BlogPosts';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { Navigation} from 'swiper/modules';
import { SwiperNavButtons } from './SwiperNavButton';
import OffecCard from '../ReferenceCards/OfferCard';
import GroupPost from '../ReferenceCards/GroupPost';
import useFadeIn from '../../_lib/hooks/useFadeIn';

SwiperCore.use([Navigation]);


interface GridSectionProps extends IGrid {}

const CardItem = (item: ICard) => {
  return <Card {...item} />;
};
const BlogItem = (item: IRefernceItem) => {
  return <BlogPost {...item} />;
};
const OfferItem = (item: IRefernceItem) => {
  return <OffecCard {...item} />;
}
const GroupItem = (item: IGroup) => {
  return <GroupPost {...item} />;
}

const GridSection = (props: GridSectionProps) => {
  const { columns, items, style, marginTop, animation } = props;
  const fadeInRef = useFadeIn();

  const sectionClassName = `${animation === 'fade-in' ? 'hidden-initial' : ''} ${marginTop === 'small' ? 'mt-8' : 'mt-16'}`;
  const sectionProps = animation === 'fade-in' ? { ref: fadeInRef } : {};

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
    } else if (item._type === 'offers') {
      return OfferItem(item as IRefernceItem);
    } else if (item._type === 'groups') {
      return GroupItem(item as IGroup);
    } else if (item._type === 'post') {
      return BlogItem(item as IRefernceItem);
    } else {
      return <>Failed to load grid items</>;
    }
  };

  switch (style) {
    case 'carousel':
      return (
        <section className={sectionClassName} {...sectionProps}>
        <Swiper
          modules={[Navigation]}
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
        <section key={props._key} className={sectionClassName} {...sectionProps}>
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
