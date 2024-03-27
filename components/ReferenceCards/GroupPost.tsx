import Link from "next/link";
import { IGroup } from "../../_lib/types/types";
import CustomImage from "../CustomImage";
import { Content } from "../Content";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("fi-FI", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

const GroupPost = (group: IGroup) => {
  const { title, excerpt, image, price, startDate, endDate, slug } = group;
  const formattedStartDate = startDate ? formatDate(startDate) : null;
  const formattedEndDate = endDate ? formatDate(endDate) : null;

  return (
    <section>
      <div className="bg-layer shadow-app rounded-app relative overflow-hidden">
        <CustomImage
          {...image}
          width={395}
          alt={image.alt}
          aspectRatio={2}
          className="w-full object-cover rounded-t-app"
        />
        {price && price.duration && price.price && price.unit && (
          <div className="absolute top-0 right-0 bg-layer  border-accent border rounded-tr-app px-3 py-1 rounded-bl-app">
            <p>
              {price.duration} {price.unit}
            </p>
            <p>{price.price} €</p>
          </div>
        )}
        <div className="px-4 py-2">
          <h2 className="text-xl font-bold pb-2">{title}</h2>
          <Content content={excerpt} />
          {(formattedStartDate || formattedEndDate || price?.location?.title || slug) && (
            <div className="border-t border-accent mt-2 pt-2">
              <div className="flex justify-between items-center">
                <div>
                  {formattedStartDate && formattedEndDate ? (
                    <p>
                      {formattedStartDate} - {formattedEndDate}
                    </p>
                  ) : (
                    <p>{formattedStartDate || formattedEndDate}</p>
                  )}
                  {price?.location?.title && <p>{price.location.title}</p>}
                </div>
                {slug && (
                   <button className="button">
                   <Link href={`/pienryhmat/${slug.current}`}>
                     lue lisää
                   </Link>
                   </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GroupPost;
