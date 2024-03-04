import Link from "next/link";
import { IRefernceItem } from "../../_lib/types/types";
import CustomImage from "../CustomImage";
import { Content } from "../Content";

const GroupPost = (group: IRefernceItem) => {
  return (
    <section>
      <Link href={`/pienryhmat/${group.slug.current}`}>
        <div className="transition-scale-small bg-layer shadow-app rounded-app">
          <CustomImage
            {...group.image}
            width={395}
            alt={group.image.alt}
            className="w-full object-cover rounded-t-app"
          />
          <div className="px-6 py-2">
            <Content content={group.excerpt} />
          </div>
        </div>
      </Link>
    </section>
  );
};

export default GroupPost;
