import { notFound } from "next/navigation";
import GroupService from "../../_lib/services/GroupService";
import HeroService from "../../_lib/services/HeroService";
import MenuService from "../../_lib/services/MenuService";
import MetadataService from "../../_lib/services/MetadataService";
import GroupPost from "../../components/ReferenceCards/GroupPost";
import MyFooter from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainHero from "../../components/hero/MainHero";

export async function generateMetadata() {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchPageMetadata("pienryhmat");

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
      ...(image && image && { image: image.asset.url }),
    },
  };

  return metadata;
}

async function Groups() {
  const [{ menu, logo, footer }, mainHero] = await Promise.all([
    new MenuService().Fetch(),
    new HeroService().Fetch("pienryhmat"),
  ]);

  const Groups = await new GroupService().FetchGroups();
  const domain = await new MetadataService().FetchDomain();
  const businessName = await new MetadataService().FetchBusinessName();


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": Groups.map((group, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "url": `https://${domain}/pienryhmat/${group.slug.current}`,
        "name": group.title,
        "description": group.description,
        "provider": {
          "@type": "Organization",
          "name": businessName, 
          "sameAs": `https://${domain}`
        },
      }
    }))
  };

  return (
<>      
<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <Header menu={menu} logo={logo} />
      <MainHero mainHero={mainHero} />
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3">
          {Groups.map((groupPost, index) => (
            <GroupPost key={index} {...groupPost} />
          ))}
        </div>
        <MyFooter menu={menu} footer={footer} />
      </>  );
}

export default Groups;
