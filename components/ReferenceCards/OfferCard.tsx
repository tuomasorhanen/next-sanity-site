"use client";
import Link from "next/link";
import { IRefernceItem } from "../../_lib/types/types";
import CustomImage from "../CustomImage";
import { Content } from "../Content";
import useFadeIn from "../../_lib/hooks/useFadeIn";

const OffecCard = (offecCard: IRefernceItem) => {
const fadeInRef = useFadeIn();

  return (
    <section className="hidden-initial" ref={fadeInRef}>
      <Link href={`/tarjoukset/${offecCard.slug.current}`}>
        <div className="transition-scale-small bg-layer shadow-app rounded-app">
          <CustomImage
            {...offecCard.image}
            width={395}
            alt={offecCard.image.alt}
            className="w-full object-cover rounded-t-app"
          />
          <div className="px-6 py-2">
            <Content content={offecCard.excerpt} />
          </div>
        </div>
      </Link>
    </section>
  );
};

export default OffecCard;
