import { notFound } from "next/navigation";
import MenuService from "../../../_lib/services/MenuService";
import MetadataService from "../../../_lib/services/MetadataService";
import { Content } from "../../../components/Content";
import MyFooter from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import GroupService from "../../../_lib/services/GroupService";
import FormSection from "../../../components/forms/FormSection";
import MapContent from "../../../components/MapContent";
import ContentService from "../../../_lib/services/ContentService";

export async function generateMetadata({ params: { ...params } }) {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchGroupMetadata(params.slug);

  if (!pageMetadata) {
    notFound();
  }

  const { title, excerpt, image } = pageMetadata;

  let metadata = {
    ...(title && { title }),
    ...(excerpt && { excerpt }),
    openGraph: {
      ...(title && { title: title }),
      ...(excerpt && { description: excerpt }),
      ...(image && image && { images: image.asset.url }),
    },
    alternates: {
      canonical: `/pienryhmat/${params.slug}`,
    },
  };

  return metadata;
}

  //TODO add schemas based on group data

type GrouProps = { params: { slug: string } };

async function Group(props: GrouProps) {
  const { menu, logo, footer } = await new MenuService().Fetch();
  const group = await new GroupService().FetchGroup(props.params.slug);
  const content = await new ContentService().Fetch(props.params.slug);

  if (!group) {
    notFound();
  }

  return (
    <>
      <Header menu={menu} logo={logo} />
      <div className="mt-[45px] sm:mt-[60px]">
          <MapContent content={content} />
      </div>
      <MyFooter menu={menu} footer={footer} />
    </>
  );
}

export default Group;
