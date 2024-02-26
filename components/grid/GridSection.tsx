import Card from './Card';
import { IGrid, ICard, IRefernceItem } from '../../_lib/types/types';
import BlogPost from '../ReferenceCards/BlogPosts';
import { useState, useEffect } from 'react';

interface GridSectionProps extends IGrid {}

const CardItem = (item: ICard) => {
  return <Card {...item} />;
};
const BlogItem = (item: IRefernceItem) => {
  return <BlogPost {...item} />;
};

const GridSection = (props: GridSectionProps) => {
  const { columns, items } = props;
  const [columnStyles, setColumnStyles] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let numColumns = 1;

      if (screenWidth >= 1100) {
        numColumns = parseInt(columns.large);
      } else if (screenWidth >= 700) {
        numColumns = parseInt(columns.medium);
      } else {
        numColumns = parseInt(columns.small);
      }

      setColumnStyles({ gridTemplateColumns: `repeat(${numColumns}, 1fr)` });
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

  return (
    <section key={props._key}>
    <div className="grid gap-2 md:gap-4" style={columnStyles}>
      {itemsArray.map((item, index) => (
        <figure key={item._id || index}>{renderGridItem(item)}</figure>
      ))}
    </div>
  </section>
  );
};

export default GridSection;
