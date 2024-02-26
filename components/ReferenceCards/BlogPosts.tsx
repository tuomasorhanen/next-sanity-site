import Link from 'next/link';
import { IRefernceItem } from '../../_lib/types/types';
import CustomImage from '../CustomImage';

const BlogPost = (blogPost: IRefernceItem) => {
  return (
    <section>
      <Link href={`/blogi/${blogPost.slug.current}`}>
        <div className="transition-scale-small bg-layer shadow-app rounded-app">
          <CustomImage
            {...blogPost.image}
            width={395}
            alt=""
            className="w-full object-cover rounded-t-app"
          />
          <div className="px-6 py-2">
            <h2 className="text-xl">{blogPost.title}</h2>
            <p className="mt-2 text-sm">{blogPost.excerpt}</p>  
          </div>
        </div>
      </Link>
    </section>
  );
};

export default BlogPost;
