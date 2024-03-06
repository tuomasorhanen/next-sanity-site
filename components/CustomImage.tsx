import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "../_lib/client/client";
import { ISanityImage } from "../_lib/types/types";

type IImgProps = {
  className?: string;
  width: number;
  aspectRatio?: number;
};

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

const generateSrcSet = (
  props: ISanityImage & IImgProps,
  width: number,
  height: number
) => {
  const sizes = [50, 320, 640, 960, 1280, 1600].filter((size) => size <= width);
  if (sizes.length === 0 || sizes[sizes.length - 1] < width) {
    sizes.push(width);
  }

  return sizes
    .map(
      (size) =>
        `${urlFor(props)
          .width(size)
          .height(Math.floor(size / (width / height)))
          .quality(90)
          .format("webp")
          .url()} ${size}w`
    )
    .join(", ");
};

const CustomImage = (props: ISanityImage & IImgProps & { loading?: 'lazy' | 'eager' }) => {
  const {
    className,
    width,
    aspectRatio = 16 / 9,
    alt,
    loading = 'lazy',
  } = props;

  const height = Math.floor(width / aspectRatio);

  let imageUrl = urlFor(props)
    .width(width)
    .height(height)
    .quality(90)
    .format("webp")
    .url();

  const srcSet = generateSrcSet(props, width, height);

  return (
    <picture>
      <source srcSet={srcSet} type="image/webp" />
      <Image
        key={props._key}
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className={className}
        quality={90}
        loading={loading}
      />
    </picture>
  );
};

export default CustomImage;
