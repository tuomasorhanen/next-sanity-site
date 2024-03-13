import { MetadataRoute } from "next";
import MetadataService from "../_lib/services/MetadataService";

const escapeXml = string => string.replace(/[<>&'"]/g, c => {
  switch (c) {
    case '<': return '&lt;';
    case '>': return '&gt;';
    case '&': return '&amp;';
    case '\'': return '&apos;';
    case '"': return '&quot;';
    default: return c;
  }
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const metadataService = new MetadataService();
  const domain = await metadataService.FetchDomain();
  const pages = await metadataService.FetchSitemap();
  const posts = await metadataService.FetchBlogSitemap();
  const offers = await metadataService.FetchOfferSitemap();
  const groups = await metadataService.FetchGroupSitemap();

  const filteredPages = pages.filter(page => page.slug.current !== "etusivu");
  const formatDate = date => date.toISOString();

  const indexEntries = [{
    url: escapeXml(`https://${domain}`),
    lastModified: formatDate(new Date()),
    changefreq: 'daily',
    priority: 1.0,
  }];

  const sitemapEntries = filteredPages.map(page => ({
    url: escapeXml(`https://${domain}/${page.slug.current}`),
    lastModified: formatDate(new Date()),
    changefreq: 'monthly',
    priority: 0.8,
  }));

  let dynamicEntries = [];

  if (posts.length > 0) {
    dynamicEntries = dynamicEntries.concat(posts.map(post => ({
      url: escapeXml(`https://${domain}/blogi/${post.slug.current}`),
      lastModified: formatDate(new Date()),
      changefreq: 'weekly',
      priority: 0.7,
    })));
  }

  if (offers.length > 0) {
    dynamicEntries = dynamicEntries.concat(offers.map(offer => ({
      url: escapeXml(`https://${domain}/tarjoukset/${offer.slug.current}`),
      lastModified: formatDate(new Date()),
      changefreq: 'daily',
      priority: 0.9,
    })));
  }

  if (groups.length > 0) {
    dynamicEntries = dynamicEntries.concat(groups.map(group => ({
      url: escapeXml(`https://${domain}/pienryhmat/${group.slug.current}`),
      lastModified: formatDate(new Date()),
      changefreq: 'monthly',
      priority: 0.6,
    })));
  }

  return [...indexEntries, ...sitemapEntries, ...dynamicEntries];
}