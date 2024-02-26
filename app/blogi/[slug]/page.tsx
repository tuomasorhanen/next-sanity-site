import { notFound } from "next/navigation";
import BlogPostService from "../../../_lib/services/BlogPostService";
import MenuService from "../../../_lib/services/MenuService";
import MetadataService from "../../../_lib/services/MetadataService";
import { Content } from "../../../components/Content";
import MyFooter from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";

export async function generateMetadata({ params: { ...params } }) {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchBlogPostMetadata(params.slug);

  if (!pageMetadata) {
    notFound();
  }
  const { title, description, image, } = pageMetadata;

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
  const Post = await new BlogPostService().Fetch(props.params.slug);

  return (
<>      
    <Header items={menu} logo={logo} />
    <div key={Post._key} className="pt-24 md:pt-40">
    <div className="sm:-px-6 mx-auto max-w-3xl px-6 pb-12 lg:max-w-4xl">
          <Content content={Post.content} />
        </div>
      </div>
      <MyFooter items={menu} footer={footer} />
      </>  );
}

export default BlogPost;
