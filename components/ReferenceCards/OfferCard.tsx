import Link from 'next/link';
import { IRefernceItem } from '../../_lib/types/types';
import CustomImage from '../CustomImage';

const OffecCard = (offecCard: IRefernceItem) => {
  return (
    <section>
      <Link href={`/tarjoukset/${offecCard.slug.current}`}>
        <div className="transition-scale-small rounded-app bg-secondary">
          <CustomImage
            {...offecCard.image}
            width={395}
            alt=""
            className="w-full object-cover rounded-t-app"
          />
          <div className="px-6 py-2">
            <h2 className="text-xl ">{offecCard.title}</h2>
            <p className="mt-2 text-sm">{offecCard.excerpt}</p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default OffecCard;
