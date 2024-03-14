"use client";
import Carousel from './carousel/Carousel';
import Faq from './Faq';
import FormSection from './forms/FormSection';
import GridSection from './grid/GridSection';
import HeadingAndTitle from './headingandTitle/HeadingAndTitle';
import HeroSection from './hero/HeroSection';
import PriceTable from './priceTable/PriceTable';

type IMapContentProps = {
  content: any[];
};

const MapContent = ({ content }: IMapContentProps) => {
  return (
    <main className="mx-auto max-w-7xl grid grid-cols-12 px-4">
      {content.map(item => {
        switch (item._type) {
          case 'cta':
            return <HeroSection key={item._key} {...item} />;
          case 'grid':
            return <div key={item._key} className='col-span-12'><GridSection {...item} /></div>;
          case 'headingAndTitle':
            return <HeadingAndTitle key={item._key} {...item} />;
          case 'faqList':
            return <Faq key={item._key} {...item} />;
          case 'carousel':
            return <Carousel key={item._key} {...item} />;
          case 'contactForm':
            return <FormSection key={item._key} {...item} />;
          case 'priceTable':
            return <PriceTable key={item._key} {...item} />;
          default:
            break;
        }
      })}
    </main>
  );
};

export default MapContent;
