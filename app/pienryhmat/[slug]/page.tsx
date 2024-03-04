import { notFound } from "next/navigation";
import MenuService from "../../../_lib/services/MenuService";
import MetadataService from "../../../_lib/services/MetadataService";
import { Content } from "../../../components/Content";
import MyFooter from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import GroupService from "../../../_lib/services/GroupService";
import ContactFormSection from "../../../components/forms/ContactFormSection";

export async function generateMetadata({ params: { ...params } }) {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchGroupMetadata(params.slug);

  if (!pageMetadata) {
    notFound();
  }

  const { title, excerpt, image } =pageMetadata;

  let metadata = {
    ...(title && { title }),
    ...(excerpt && { excerpt }),
    openGraph: {
      ...(title && { title: title }),
      ...(excerpt && { description: excerpt }),
      ...(image && image && { image: image.asset.url }),
    },
  };

  return metadata;
}

type GrouProps = { params: { slug: string } };

async function Group(props: GrouProps) {
  const { menu, logo, footer } = await new MenuService().Fetch();
  const group = await new GroupService().FetchGroup(props.params.slug);

  return (
<>      
    <Header items={menu} logo={logo} />
    <div key={group._key} className=" pt-24 md:pt-40">
    <div className="sm:-px-6 mx-auto max-w-3xl px-6 lg:max-w-4xl">
          <Content content={group.content} />
        </div>
        {group.showForm && (
        <ContactFormSection {...group.form}/>
        )}
            </div>
      <MyFooter items={menu} footer={footer} />
      </>  );
}

export default Group;
