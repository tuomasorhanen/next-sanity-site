import Link from 'next/link';
import { ICallToAction } from '../_lib/types/types';
import CustomImage from './CustomImage';
import React from 'react';

interface ButtonRendererProps {
  button: ICallToAction;
  className?: string;
}

const ButtonRenderer: React.FC<ButtonRendererProps> = ({ button, className }) => {

  try {
    const { callToAction, navigateToPage, linkType, navigateToUrl, image, style } = button;
    const styleClassName = style === 'style1' ? 'button' : 'button2';
    const buttonClass = `${className} ${styleClassName}`;

    switch (linkType) { 
      case 'internal':
        return (
          <Link href={navigateToPage || '/etusivu'}>
            <button className={`transition-scale`}>
              {image?.asset ? (
                <button className={`${className}`}>
                  <CustomImage {...image} alt={callToAction} width={50} className="object-cover w-6" />
                </button>
              ) : (
                <span className={buttonClass}>
                  {callToAction}
                </span>
              )}
            </button>
          </Link>
        );
      case 'external':
        return (
          <a href={navigateToUrl} className={`transition-scale`}> 
            {image?.asset ? (
              <button className={`${className}`}>
                <CustomImage {...image} alt={callToAction} width={50} className="object-cover w-6" />
              </button>
            ) : (
              <span className={buttonClass}>
              {callToAction}
              </span>
            )}
          </a>
        );
      default:
        console.warn('Received an unprocessable button:', button);
        return (
          <span className={`button bg-red-500 text-white`}>
            Broken button
          </span>
        );
    }
  } catch (error) {
    console.error('Error rendering button:', error);
    return <></>;
  }
};

export default ButtonRenderer;
