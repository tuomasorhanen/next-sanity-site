import { notFound } from "next/navigation";
import HeroService from "../../_lib/services/HeroService";
import MenuService from "../../_lib/services/MenuService";
import MetadataService from "../../_lib/services/MetadataService";
import OfferService from "../../_lib/services/OfferService";
import OffecCard from "../../components/ReferenceCards/OfferCard";
import MyFooter from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainHero from "../../components/hero/MainHero";

export async function generateMetadata() {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchPageMetadata("tarjoukset");
  if (!pageMetadata) {
    notFound();
  }
  const { title, description, image, } =pageMetadata;

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

async function Offers() {
  const [{ menu, logo, footer }, mainHero] = await Promise.all([
    new MenuService().Fetch(),
    new HeroService().Fetch("tarjoukset"),
  ]);

  const Offers = await new OfferService().Fetch();

  return (
<>      
    <Header items={menu} logo={logo} />
      <MainHero mainHero={mainHero} />
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3">
          {Offers.map((OfferPost, index) => (
            <OffecCard key={index} {...OfferPost} />
          ))}
        </div>
        <MyFooter items={menu} footer={footer} />
      </>  );
}

export default Offers;
