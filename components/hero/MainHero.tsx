import { IHero } from "../../_lib/types/types";
import ButtonRenderer from "../ButtonRenderer";
import { Content } from "../Content";
import CustomImage from "../CustomImage";

const MainHero = ({ mainHero }: { mainHero: IHero }) => {
  const { image, buttons, layout, opacity, heroBgColor, content } = mainHero;

  const bgColorStyle = heroBgColor
    ? { backgroundColor: heroBgColor.value }
    : {};
  const opacityClass = `opacity-${opacity || 100}`;

  switch (layout) {
    case "simple-image-right":
      return (
        <section
          key={`${mainHero._key}-simple-image-right`}
          className="flex items-center mt-[77px] sm:mt-[124px]"
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
                  aspectRatio={1 / 1}
                  loading="eager"
                />
              </div>
            )}
            <div className="flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
              <Content content={content} />
              {buttons &&
                buttons.map((button, index) => (
                  <ButtonRenderer key={button._id || index} button={button} />
                ))}
            </div>
            <div className="hidden sm:block">
              {image && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  aspectRatio={1 / 1}
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
          className="flex items-center pt-[64px] sm:pt-[124px]"
          style={bgColorStyle}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:py-16">
            <div className="hidden sm:block">
              {image && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  aspectRatio={1 / 1}
                  loading="eager"
                />
              )}
            </div>
            <div className="flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
              <Content content={content} />
              {buttons &&
                buttons.map((button, index) => (
                  <ButtonRenderer key={button._id || index} button={button} />
                ))}
            </div>
            <div className="sm:hidden">
              {image && (
                <CustomImage
                  {...image}
                  className="w-full rounded-app object-cover"
                  alt={image.alt}
                  width={607}
                  aspectRatio={1 / 1}
                  loading="eager"
                />
              )}
            </div>
          </div>
        </section>
      );
    case "image-bg-center":
      return (
        <section
          key={`${mainHero._key}-image-bg-center-slim`}
          className="hero relative grid h-[500px] w-full grid-cols-1 items-center justify-center md:h-screen"
          style={bgColorStyle}
        >
          <div
            className={`absolute left-0 top-0 z-10 h-full w-full ${opacityClass}`}
          >
            {image && (
              <CustomImage
                {...image}
                className="h-full w-full object-cover"
                alt={image.alt}
                width={1960}
                loading="eager"
              />
            )}
          </div>
          <div className="z-30 mx-auto max-w-5xl text-center px-4 md:px-0">
            <Content content={content} />
            {buttons &&
              buttons.map((button, index) => (
                <ButtonRenderer key={button._id || index} button={button} />
              ))}
          </div>
        </section>
      );
    default:
      return <></>;
  }
};

export default MainHero;
