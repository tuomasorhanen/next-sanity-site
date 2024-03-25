import { notFound } from "next/navigation";
import HeroService from "../_lib/services/HeroService";
import MainHero from "../components/hero/MainHero";
import MapContent from "../components/MapContent";
import ContentService from "../_lib/services/ContentService";
import MenuService from "../_lib/services/MenuService";
import Header from "../components/header/Header";
import MyFooter from "../components/footer/Footer";
import MetadataService from "../_lib/services/MetadataService";

export async function generateMetadata() {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchPageMetadata("etusivu");

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
  };

  return metadata;
}

async function Home() {
  const [{ menu, logo, footer }, mainHero] = await Promise.all([
    new MenuService().Fetch(),
    new HeroService().Fetch("etusivu"),
  ]);

  if (!mainHero) {
    notFound();
  }

  const content = await new ContentService().Fetch("etusivu");

  return (
<>      
    <Header menu={menu} logo={logo} />
      <MainHero mainHero={mainHero} />
      <MapContent content={content} />
      <MyFooter menu={menu} footer={footer}/>
      </>  );
}

export default Home;
