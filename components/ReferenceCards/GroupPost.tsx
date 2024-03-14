import Link from "next/link";
import { IGroup } from "../../_lib/types/types";
import CustomImage from "../CustomImage";
import { Content } from "../Content";

// Helper function to format dates
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fi-FI', { day: '2-digit', month: '2-digit' }).format(date);
}

const GroupPost = (group: IGroup) => {
  const formattedStartDate = formatDate(group.startDate);
  const formattedEndDate = formatDate(group.endDate); 

  return (
    <section>
      <Link href={`/pienryhmat/${group.slug.current}`}>
        <div className="transition-scale-small bg-layer shadow-app rounded-app relative overflow-hidden">
          <CustomImage
            {...group.image}
            width={395}
            alt={group.image.alt}
            className="w-full object-cover rounded-t-app"
          />
          <div className="absolute top-0 right-0 bg-layer font-bold px-3 py-1 rounded-bl-app">
            <p>{group.price.duration} {group.price.unit}</p>
            <p>{group.price.price} €</p>
          </div>
          <div className="px-6 py-2">
            <h2 className="text-xl font-bold pb-2">{group.title}</h2>
            <Content content={group.excerpt} />
          </div>
         
        </div>
      </Link>
    </section>
  );
};
export default GroupPost;
