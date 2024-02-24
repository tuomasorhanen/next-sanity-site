import BlogService from "../../_lib/services/BlogService";
import HeroService from "../../_lib/services/HeroService";
import MenuService from "../../_lib/services/MenuService";
import BlogPosts from "../../components/ReferenceCards/BlogPosts";
import MyFooter from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainHero from "../../components/hero/MainHero";



async function Blog() {
  const [{ menu, logo }, mainHero] = await Promise.all([
    new MenuService().Fetch(),
    new HeroService().Fetch("blogi"),
  ]);

  const Blogs = await new BlogService().Fetch();

  return (
<>      
    <Header items={menu} logo={logo} />
      <MainHero mainHero={mainHero} />
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3">
          {Blogs.map((blogPost, index) => (
            <BlogPosts key={index} {...blogPost} />
          ))}
        </div>
      <MyFooter items={menu} />
      </>  );
}

export default Blog;
