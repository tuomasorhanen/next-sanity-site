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
  const domain = await new MetadataService().FetchDomain();
  const mydomain = domain.domain;
  const businessName = await new MetadataService().FetchBusinessName();

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "Course",
    "url": `https://${mydomain}/pienryhmat/${group.slug.current}`,
    "name": group.title,
    "description": group.description,
    "provider": {
      "@type": "Organization",
      "name": businessName,
      "sameAs": `https://${mydomain}`
    }
  };

  return (
<>      
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <Header menu={menu} logo={logo} />
    <div key={group._key} className=" pt-24 md:pt-40 px-4">
    <div className="mx-auto max-w-3xl lg:max-w-4xl">
          <Content content={group.content} />
        </div>
        {group.showForm && (
        <ContactFormSection {...group.form}/>
        )}
            </div>
      <MyFooter menu={menu} footer={footer} />
      </>  );
}

export default Group;
