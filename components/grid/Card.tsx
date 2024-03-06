"use client";
import { ICard } from "../../_lib/types/types";
import ButtonRenderer from "../../components/ButtonRenderer";
import { Content } from "../Content";
import CustomImage from "../CustomImage";

const Card = (props: ICard) => {
  const { image, layout, buttons, content } = props;

  switch (layout) {
    case "image-top":
      return (
        <figure key={props._key}>
          {image?.asset && (
            <div className="rounded-app bg-layer">
              <CustomImage
                {...image}
                alt={image.alt}
                width={645}
                className="object-cover rounded-t-app "
              />
              <div className="p-4 hyphenate">
                <Content content={content} />
                {buttons && buttons.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {buttons.map((button, index) => (
                      <ButtonRenderer
                        key={button._id || index}
                        button={button}
                        className="py-1 px-2"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </figure>
      );
    case "image-bg":
      return (
        <figure key={props._key}>
          <div className="relative flex justify-center text-bg rounded-app">
            {image?.asset && (
              <CustomImage
                {...image}
                alt={image.alt}
                width={645}
                className="object-cover rounded-app"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="flex flex-col items-center justify-center text-center">
                <Content content={content} />
                <nav>
                  {buttons &&
                    buttons.map((button) => (
                      <ButtonRenderer key={button._key} button={button} />
                    ))}
                </nav>
              </div>
            </div>
          </div>
        </figure>
      );
    case "simple":
      return (
        <div key={props._key} className="rounded-app bg-layer">
          <div className="p-4 hyphenate">
            <Content content={content} />
            {buttons && buttons.length > 0 && (
              <div className="flex gap-2 mt-2">
                {buttons.map((button, index) => (
                  <ButtonRenderer key={button._id || index} button={button} />
                ))}
              </div>
            )}
          </div>
        </div>
      );

    default:
      return <></>;
  }
};

export default Card;
