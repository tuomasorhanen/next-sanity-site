import { notFound } from "next/navigation";
import MenuService from "../../../_lib/services/MenuService";
import MetadataService from "../../../_lib/services/MetadataService";
import { Content } from "../../../components/Content";
import MyFooter from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import BlogService from "../../../_lib/services/BlogService";
import CustomImage from "../../../components/CustomImage";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fi-FI', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

export async function generateMetadata({ params: { ...params } }) {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchBlogPostMetadata(params.slug);

  if (!pageMetadata) {
    notFound();
  }
  const { title, description, image } = pageMetadata;

  let metadata = {
    ...(title && { title }),
    ...(description && { description }),
    openGraph: {
      ...(title && { title: title }),
      ...(description && { description: description }),
      ...(image && image && { image: image.asset.url }),
    },
  };

  return metadata;
}

type BlogsProps = { params: { slug: string } };

async function BlogPost(props: BlogsProps) {
  const { menu, logo, footer } = await new MenuService().Fetch();
  const Post = await new BlogService().FetchPost(props.params.slug);
  const formattedDate = formatDate(Post.publishedAt);

  if (!Post) {
    notFound();
  }
  
  return (
   <>
      <Header menu={menu} logo={logo} />
      <div key={Post._key} className="pt-24 md:pt-40">
        <div className="sm:-px-6 mx-auto max-w-3xl px-6 pb-12 lg:max-w-4xl">
          <h1 className="text-3xl sm:text-5xl border-b border-accent">{Post.title}</h1>
          <Content content={Post.content} />
          <div className="mt-4 flex items-center border-t border-accent pt-4">
              <CustomImage
                {...Post.author.image}
                width={450}
                alt={Post.author.name}
                className="mr-4 h-16 w-16 rounded-full object-cover bg-transparent shadow-app border border-accent"
              />
              <div className="flex flex-col text-opacity-50">
                <p>{Post.author.name}</p>
                <p>Julkaistu: {formattedDate}</p>
              </div>
            </div>
        </div>
      </div>
      <MyFooter menu={menu} footer={footer} />
    </>
  );
}

export default BlogPost;
