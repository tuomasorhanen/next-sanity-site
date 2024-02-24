import ContentService from "../../_lib/services/ContentService";
import HeroService from "../../_lib/services/HeroService";
import MenuService from "../../_lib/services/MenuService";
import MetadataService from "../../_lib/services/MetadataService";
import MapContent from "../../components/MapContent";
import MyFooter from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainHero from "../../components/hero/MainHero";

export async function generateMetadata({ params: { ...params } }) {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchPageMetadata(params.slug);
  const { title, description, image, } =pageMetadata.metadata;

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

type HomeProps = { params: { slug: string } };

async function Home(props: HomeProps) {
  const [{ menu, logo }, mainHero] = await Promise.all([
    new MenuService().Fetch(),
    new HeroService().Fetch(props.params.slug),
  ]);

  const content = await new ContentService().Fetch(props.params.slug);

  return (
<>      
    <Header items={menu} logo={logo} />
      <MainHero mainHero={mainHero} />
      <MapContent content={content} />
      <MyFooter items={menu} />
      </>  );
}

export default Home;
