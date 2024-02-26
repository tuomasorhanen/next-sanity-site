import Link from 'next/link';
import { IRefernceItem } from '../../_lib/types/types';
import CustomImage from '../CustomImage';

const GroupPost = (group: IRefernceItem) => {
  return (
    <section>
      <Link href={`/pienryhmat/${group.slug.current}`}>
        <div className="transition-scale-small bg-secondary rounded-app">
        <CustomImage
            {...group.image}
            width={395}
            alt=""
            className="w-full object-cover rounded-t-app"
          />          <div className="px-6 py-2">
            <h2 className="text-xl">{group.title}</h2>
            <p className="mt-2 text-sm">{group.excerpt}</p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default GroupPost;
