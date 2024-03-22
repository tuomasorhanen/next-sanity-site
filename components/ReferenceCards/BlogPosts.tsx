import Link from 'next/link';
import { IRefernceItem } from '../../_lib/types/types';
import CustomImage from '../CustomImage';
import { Content } from '../Content';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fi-FI', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

const BlogPost = (blogPost: IRefernceItem) => {
  const formattedDate = formatDate(blogPost.publishedAt);

  return (
    <section>
      <Link href={`/blogi/${blogPost.slug.current}`}>
        <div className="transition-scale-small bg-layer shadow-app rounded-app">
          <CustomImage
            {...blogPost.image}
            width={395}
            alt={blogPost.image.alt}
            className="w-full object-cover rounded-t-app"
          />
          <div className="px-4 py-2">
          <Content content={blogPost.excerpt} />
          <div className="flex border-t border-accent mt-2 pt-2">
              <CustomImage
                {...blogPost.author.image}
                width={450}
                alt={blogPost.author.name}
                className="mr-4 h-12 w-12 rounded-full object-cover bg-transparent shadow-app border border-accent"
              />
              <div className="flex flex-col text-opacity-50">
                <p>{blogPost.author.name}</p>
                <p>{formattedDate}</p>
              </div>
            </div>
          </div>
          
        </div>
      </Link>
    </section>
  );
};

export default BlogPost;
