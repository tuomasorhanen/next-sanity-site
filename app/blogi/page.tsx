import { notFound } from "next/navigation";
import BlogService from "../../_lib/services/BlogService";
import HeroService from "../../_lib/services/HeroService";
import MenuService from "../../_lib/services/MenuService";
import MetadataService from "../../_lib/services/MetadataService";
import BlogPosts from "../../components/ReferenceCards/BlogPosts";
import MyFooter from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainHero from "../../components/hero/MainHero";

export async function generateMetadata() {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchPageMetadata("blogi");

  if (!pageMetadata) {
    notFound();
  }
  
  const { title, description, image, } = pageMetadata.metadata;

  let metadata = {
    ...(title && { title }),
    ...(description && { description }),
    openGraph: {
      ...(title && { title: title }),
      ...(description && { description: description }),
      ...(image && image && { images: image.asset.url }),
    },
    alternates: {
      canonical: '/blogi',
    },
  };

  return metadata;
}

async function Blogs() {
  const [{ menu, logo, footer }, mainHero] = await Promise.all([
    new MenuService().Fetch(),
    new HeroService().Fetch("blogi"),
  ]);


  if (!mainHero) {
    notFound();
  }

  const Blogs = await new BlogService().FetchBlogs();

  return (
<>      
    <Header menu={menu} logo={logo} />
      <MainHero mainHero={mainHero} />
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3">
          {Blogs.map((post, index) => (
            <BlogPosts key={index} {...post} />
          ))}
        </div>
        <MyFooter menu={menu} footer={footer} />
      </>  );
}

export default Blogs;
