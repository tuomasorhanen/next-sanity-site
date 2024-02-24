import { IHero } from "../../_lib/types/types";
import ButtonRenderer from "../../components/ButtonRenderer";
import { Content } from "../Content";
import CustomImage from "../CustomImage";

const HeroSection = (props: IHero) => {
  const { image, buttons, layout, opacity, CtaBgColor, content } = props;
  const bgColorStyle = CtaBgColor
    ? { backgroundColor: CtaBgColor.value }
    : {};
  const opacityClass = `opacity-${opacity || 100}`;
  
  switch (layout) {
    case "simple-image-right":
      return (
        <section
          key={`${props._key}-simple-image-right`}
          className="mt-16"
          style={bgColorStyle}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2">
            {image && (
              <div className="sm:hidden">
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  aspectRatio={1/1}
                />
              </div>
            )}
            <div className="flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
              <Content content={content} />
              <nav className="flex flex-shrink items-center justify-center gap-4">
               {buttons && buttons.map((button, index) => (
            <ButtonRenderer key={button._id || index} button={button}/>
            ))}
              </nav>
            </div>
            <div className="hidden sm:block">
              {image && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  aspectRatio={1/1}
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
          className="mt-16"
          style={bgColorStyle}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2">
            <div className="hidden sm:block">
              {image && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  aspectRatio={1/1}                />
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
              <Content content={content} />
              <nav className="flex flex-shrink items-center justify-center gap-4">
               {buttons && buttons.map((button, index) => (
            <ButtonRenderer key={button._id || index} button={button}/>
            ))}
              </nav>
            </div>
            <div className="sm:hidden">
              {image && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  aspectRatio={1/1}                />
              )}
            </div>
          </div>
        </section>
      );
    case "image-bg-center-slim":
      return (
        <section
          key={`${props._key}-image-bg-center-slim`}
          className="relative mt-16 grid h-[400px] w-full grid-cols-1 items-center justify-center"
          style={bgColorStyle}
        >
          <div
            className={`absolute left-0 top-0 z-10 h-full w-full ${opacityClass}`}
          >            {image && (
              <CustomImage
                {...image}
                className="h-full w-full object-cover"
                alt={image.alt}
                width={1280}
                aspectRatio={4.255}
              />
            )}
          </div>
          <div className="z-30 mx-auto max-w-6xl px-4 text-center">
            <Content content={content} />
            {buttons && buttons.map((button, index) => (
            <ButtonRenderer key={button._id || index} button={button}/>
            ))}
          </div>
        </section>
      );

    default:
      return <></>;
  }
};

export default HeroSection;
