"use client";
import { ICard } from '../../_lib/types/types';
import ButtonRenderer from '../../components/ButtonRenderer';
import { Content } from '../Content';
import CustomImage from '../CustomImage';

const Card = (props: ICard) => {
  const { image, layout, buttons, content } = props;

  switch (layout) {
    case 'image-top':
      return (
        <figure key={props._key}>
          {image && (
            <div className="bg-layer rounded-app border-accent border-2">
              <CustomImage {...image} alt={image.alt} width={645} className="object-cover rounded-t-app " />
              <div className="px-4 pt-4 pb-2 flex justify-between">
                <Content content={content} />
            {buttons && buttons.map(btn => <ButtonRenderer key={btn._key} _ref={btn._ref} className='button' />)}
              </div>
            </div>
          )}
          
        </figure>
      );
    case 'image-bg':
      return (
        <figure key={props._key}>
          <div className="relative flex justify-center text-bg rounded-app">
            {image && (
              <CustomImage
                {...image}
                alt={image.alt}
                width={645}
                className="object-cover rounded-app"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center p-5">
              <div className="flex flex-col items-center justify-center text-center">
                <Content content={content} />
                <nav>
                  {buttons && buttons.map(btn => <ButtonRenderer key={`${layout}-${btn._key}`} _ref={btn._ref} className='button'  />)}
                </nav>
              </div>
            </div>
          </div>
        </figure>
      );

    default:
      return <></>;
  }
};

export default Card;
