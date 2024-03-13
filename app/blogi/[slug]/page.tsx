import { notFound } from "next/navigation";
import MenuService from "../../../_lib/services/MenuService";
import MetadataService from "../../../_lib/services/MetadataService";
import { Content } from "../../../components/Content";
import MyFooter from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import BlogService from "../../../_lib/services/BlogService";

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
  const domain = await new MetadataService().FetchDomain();
  const businessName = await new MetadataService().FetchBusinessName();
  const imageUrl = await new BlogService().FetchPostImage(props.params.slug);

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    headline: Post.title,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: Post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: businessName.companyName,
      url: `https://${domain}`,
    },
    description: Post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${domain}/blogi/${Post.slug.current}`,
    },
    datePublished: Post.publishedAt,
    dateModified: Post._updatedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header menu={menu} logo={logo} />
      <div key={Post._key} className="pt-24 md:pt-40">
        <div className="sm:-px-6 mx-auto max-w-3xl px-6 pb-12 lg:max-w-4xl">
          <Content content={Post.content} />
        </div>
      </div>
      <MyFooter menu={menu} footer={footer} />
    </>
  );
}

export default BlogPost;
