import Link from 'next/link';
import { ICallToAction } from '../_lib/types/types';
import CustomImage from './CustomImage';

interface ButtonRendererProps {
  button: ICallToAction;
  className?: string;
}

const ButtonRenderer: React.FC<ButtonRendererProps> = ({ button, className }) => {
  const { callToAction, navigateToPage, linkType, navigateToUrl, image } = button;

  switch (linkType) {
    case 'internal':
      return (
        <Link href={navigateToPage || '/etusivu'}>
          <div>
            {image ? (
              <button className={`${className}`}>
                <CustomImage {...image} alt={callToAction} width={50} className="object-cover" />
              </button>
            ) : (
              <span className={`button ${className}`}>
                {callToAction}
              </span>
            )}
          </div>
        </Link>
      );
    case 'external':
      return (
        <a href={navigateToUrl}>
          {image ? (
            <button className={`${className}`}>
              <CustomImage {...image} alt={callToAction} width={50} className="object-cover" />
            </button>
          ) : (
            <span className={`button ${className}`}>
              {callToAction}
            </span>
          )}
        </a>
      );
    default:
      console.warn('Received an unprocessable button:', button);
      return (
        <button className={`button ${className}`}>
          SHIT
        </button>
      );
  }
};

export default ButtonRenderer;
