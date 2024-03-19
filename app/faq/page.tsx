import { notFound } from "next/navigation";
import HeroService from "../../_lib/services/HeroService";
import MenuService from "../../_lib/services/MenuService";
import MetadataService from "../../_lib/services/MetadataService";
import MyFooter from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MainHero from "../../components/hero/MainHero";
import FaqService from "../../_lib/services/FaqService";
import FaqPageComponent from "../../components/FaqPage";

export async function generateMetadata() {
  const metadataService = new MetadataService();
  const pageMetadata = await metadataService.FetchPageMetadata("faq");

  if (!pageMetadata) {
    notFound();
  }

  const { title, description, image } = pageMetadata.metadata;

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

async function FaqPage() {
  const [{ menu, logo, footer }, mainHero] = await Promise.all([
    new MenuService().Fetch(),
    new HeroService().Fetch("faq"),
  ]);

  if (!mainHero) {
    notFound();
  }

  const Faqs = await new FaqService().FetchFaqs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header menu={menu} logo={logo} />
      <MainHero mainHero={mainHero} />
      <div className="mx-auto max-w-7xl grid grid-cols-12 px-4">
        <FaqPageComponent Faqs={Faqs} />
      </div>
      <MyFooter menu={menu} footer={footer} />
    </>
  );
}

export default FaqPage;
