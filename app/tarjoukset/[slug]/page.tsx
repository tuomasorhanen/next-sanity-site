import { notFound } from "next/navigation";
import MenuService from "../../../_lib/services/MenuService";
import MetadataService from "../../../_lib/services/MetadataService";
import { Content } from "../../../components/Content";
import MyFooter from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import OfferService from "../../../_lib/services/OfferService";

export async function generateMetadata({ params: { ...params } }) {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchOfferMetadata(params.slug);

  if (!pageMetadata) {
    notFound();
  }
  const { title, excerpt, image, } = pageMetadata;

  let metadata = {
    ...(title && { title }),
    ...(excerpt && { excerpt }),
    openGraph: {
      ...(title && { title: title }),
      ...(excerpt && { description: excerpt }),
      ...(image && image && { images: image.asset.url }),
    },
    alternates: {
      canonical: `/tarjoukset/${params.slug}`,
    },
  };

  return metadata;
}

type HomeProps = { params: { slug: string } };

async function Offer(props: HomeProps) {
  const { menu, logo, footer } = await new MenuService().Fetch();
  const Post = await new OfferService().FetchOfferPost(props.params.slug);

  if (!Post) {
    notFound();
  }

  return (
<>      
    <Header menu={menu} logo={logo} />
    <div key={Post._key} className=" pt-24 md:pt-40">
    <div className="sm:-px-6 mx-auto max-w-3xl px-6 pb-12 lg:max-w-4xl">
          <Content content={Post.content} />
        </div>
      </div>
      <MyFooter menu={menu} footer={footer} />
      </>  );
}

export default Offer;
