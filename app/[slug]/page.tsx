import { notFound } from "next/navigation";
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

type HomeProps = { params: { slug: string } };

async function Slug(props: HomeProps) {
  const [{ menu, logo, footer }, mainHero] = await Promise.all([
    new MenuService().Fetch(),
    new HeroService().Fetch(props.params.slug),
  ]);

  if (!mainHero) {
    notFound();
  }

  const content = await new ContentService().Fetch(props.params.slug);

  return (
<>      
<Header menu={menu} logo={logo} />
      <MainHero mainHero={mainHero} />
      <MapContent content={content} />
      <MyFooter menu={menu} footer={footer}/>
      </>  );
}

export default Slug;
