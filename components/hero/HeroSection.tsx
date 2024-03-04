import { IHero } from "../../_lib/types/types";
import ButtonRenderer from "../../components/ButtonRenderer";
import { Content } from "../Content";
import CustomImage from "../CustomImage";

const HeroSection = (props: IHero) => {
  const { image, buttons, layout, opacity, CtaBgColor, content } = props;

  const bgColorStyle = CtaBgColor ? { backgroundColor: CtaBgColor.value } : {};
  const opacityStyle = opacity ? { opacity: opacity / 100 } : {};

  switch (layout) {
    case "simple-image-right":
      return (
        <section
          key={`${props._key}-simple-image-right`}
          className="mt-16 col-span-12"
          style={bgColorStyle}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {image && (
              <div className="sm:hidden">
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover shadow-app"
                  alt={image.alt}
                  width={607}
                  loading="eager"
                />
              </div>
            )}
            <div className="flex flex-col justify-center items-start text-left hero-title hyphenate">
              <Content content={content} />
              <div className="flex flex-row sm:justify-center gap-2 mt-4">
                {buttons &&
                  buttons.map((button, index) => (
                    <ButtonRenderer key={button._id || index} button={button} />
                  ))}
              </div>
            </div>
            <div className="hidden sm:block">
              {image && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover shadow-app"
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
          key={`${props._key}-simple-image-left`}
          className="mt-16 col-span-12"
          style={bgColorStyle}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="">
              {image && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover shadow-app"
                  alt={image.alt}
                  width={607}
                  loading="eager"
                />
              )}
            </div>
            <div className="flex flex-col justify-center items-start text-left hero-title hyphenate">
              <Content content={content} />
              <div className="flex flex-row sm:justify-center gap-2 mt-4">
                {buttons &&
                  buttons.map((button, index) => (
                    <ButtonRenderer key={button._id || index} button={button} />
                  ))}
              </div>
            </div>
          </div>
        </section>
      );
    case "image-bg-center-wide":
      return (
        <section
        key={`${props._key}-image-bg-center-slim`}
        className="col-span-12 mt-16 overflow-hidden relative py-8 md:py-12 w-screen place-self-center"
        style={bgColorStyle}
      >
        <div className="z-10 relative mx-auto max-w-5xl text-center">
          <Content content={content} />
          {buttons && buttons.length > 0 && (
          <div className="flex justify-center gap-2 mt-4">
            {buttons.map((button, index) => (
              <ButtonRenderer key={button._id || index} button={button} />
            ))}
          </div>
        )}
        </div>
        {image && (
          <div
            className="absolute left-0 top-0 h-full w-full z-0"
            style={opacityStyle}
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
      </section>
      
      );
    case "image-bg-center-slim":
      return (
        <section
        key={`${props._key}-image-bg-center-slim`}
        className="col-span-12 mt-16 overflow-hidden relative py-8 md:py-12 rounded-app shadow-app"
        style={bgColorStyle}
      >
        <div className="z-10 relative mx-auto max-w-5xl text-center px-4 md:px-0">
          <Content content={content} />
          {buttons && buttons.length > 0 && (
          <div className="flex justify-center gap-2 mt-4">
            {buttons.map((button, index) => (
              <ButtonRenderer key={button._id || index} button={button} />
            ))}
          </div>
        )}
        </div>
        {image && (
          <div
            className="absolute left-0 top-0 h-full w-full z-0"
            style={opacityStyle}
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
      </section>
      
      );
    default:
      return <></>;
  }
};

export default HeroSection;
