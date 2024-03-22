"use client";
import useFadeIn from "../../_lib/hooks/useFadeIn";
import { IHero } from "../../_lib/types/types";
import ButtonRenderer from "../ButtonRenderer";
import { Content } from "../Content";
import CustomImage from "../CustomImage";

const colorClass = {
  Light: 'bg-bg',
  Dark: 'bg-text',
  Accent: 'bg-accent',
  Layer: 'bg-layer',
};

const MainHero = ({ mainHero }: { mainHero: IHero }) => {
  const { image, buttons, layout, opacity, heroBgColor, content, animation } = mainHero;

  const bgColorClass = colorClass[heroBgColor?.label] || '';

  const fadeInRef = useFadeIn();
  const sectionClassName = `${animation === 'fade-in' ? 'hidden-initial' : ''} ${bgColorClass}`;
    const sectionProps = animation === 'fade-in' ? { ref: fadeInRef } : {};

  switch (layout) {
    case "simple-image-right":
      return (
        <section
          key={`${mainHero._key}-simple-image-right`}
          className={`flex items-center mt-[124px] ${sectionClassName}`}
          {...sectionProps}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2">
            {image?.asset && (
              <div className="sm:hidden">
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  loading="eager"
                />
              </div>
            )}
            <div className="flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
              <Content content={content} />
              <div className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-4">
      {buttons &&
        buttons.map((button, index) => (
          <ButtonRenderer key={button._id || index} button={button} />
        ))}
    </div>
            </div>
            <div className="hidden sm:block">
              {image?.asset && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  loading="eager"
                />
              )}
            </div>
          </div>
        </section>
      );
    case "simple-image-left":
      return (
        <section
          key={`${mainHero._key}-simple-image-left`}
          className={`flex items-center mt-[124px] ${sectionClassName}`}
          {...sectionProps}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:py-16">
            <div className="hidden sm:block">
              {image?.asset && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  loading="eager"
                />
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
              <Content content={content} />
              <div className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-4">
      {buttons &&
        buttons.map((button, index) => (
          <ButtonRenderer key={button._id || index} button={button} />
        ))}
    </div>
            </div>
            <div className="sm:hidden">
              {image?.asset && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  loading="eager"
                />
              )}
            </div>
          </div>
        </section>
      );
    case "banner":
      return (
        <section
          key={`${mainHero._key}-image-bg-center-slim`}
          className={`col-span-12 pt-[124px] overflow-hidden relative py-12 w-screen place-self-center bg-accent text-bg ${sectionClassName}`}
          {...sectionProps}
        >
          {image?.asset && (
            <div
              className="absolute left-0 top-0 z-10 h-full w-full"
              style={{opacity: opacity / 100}}
            >
              <CustomImage
                {...image}
                className="h-full w-full object-cover"
                alt={image.alt}
                width={1960}
                loading="eager"
              />
            </div>
          )}
          <div className="z-30 mx-auto max-w-5xl text-center px-4 md:px-0">
            {content && <Content content={content} />}
              {buttons && buttons.length > 0 && (
          <div className="flex justify-center gap-2 mt-4">
            {buttons.map((button, index) => (
              <ButtonRenderer key={button._id || index} button={button} />
            ))}
          </div>
        )}
          </div>
        </section>
      );
      case "image-bg-center":
        return (
          <section
            key={`${mainHero._key}-image-bg-center-slim`}
            className={`relative flex h-[500px] w-full items-center justify-center md:h-screen ${sectionClassName}`}
            {...sectionProps}
          >
             <div className="z-30 mx-auto max-w-5xl text-center px-4">
              <Content content={content} />
              <div className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-4">
                {buttons && buttons.map((button, index) => (
                  <ButtonRenderer key={button._id || index} button={button} />
                ))}
              </div>
            </div>
            <div
              className="absolute left-0 top-0 z-10 h-full w-full"
              style={{ opacity: opacity / 100 }}
            >
              {image?.asset && (
                <CustomImage
                  {...image}
                  className="h-full w-full object-cover"
                  alt={image.alt}
                  width={1960}
                  loading="eager"
                />
              )}
            </div>
           
          </section>
        );
      
      case 'heading':
      return (
        <section key={mainHero._key}
        className={`col-span-12 pt-[124px] ${sectionClassName}`}
        {...sectionProps}>
          <div className="mx-auto max-w-4xl text-center">
            <Content content={content} />
          </div>
        </section>
      );

      case "none":
        return <div className="mt-[45px] sm:mt-[60px]"></div>
    default:
      return <></>;
  }
};

export default MainHero;
