import { client } from "../client/client";
import { IPage, IRefernceItem, ISiteSettings } from "../types/types";



class MetadataService {

    public async FetchDefaultMetadata(): Promise<ISiteSettings> {
        const defaultMetadata = await client.fetch(`*[_type == 'siteSettings'][0]{title, description, image{..., asset->{...,}}, domain, keywords}`);
        let defaultSiteMetadata = defaultMetadata

        return defaultSiteMetadata;
    }

    public async FetchPageMetadata(slug: string): Promise<IPage> {
        const pageData = await client.fetch(`*[slug.current == '${slug}'][0]{metadata{..., image{..., asset->{...,}}}}`, {}, { cache: "no-store" } );
        let metadata = pageData

        return metadata;
    }

    public async FetchBlogPostMetadata(slug: string): Promise<IRefernceItem> {
        const pageData = await client.fetch(`*[_type == 'post' && slug.current == '${slug}'][0]{title, excerpt, image{..., asset->{...,}}}`, {}, { cache: "no-store" } );
        let blogMetadata = pageData

        return blogMetadata;
    }

    public async FetchOfferMetadata(slug: string): Promise<IRefernceItem> {
        const pageData = await client.fetch(`*[_type == 'offers' && slug.current == '${slug}'][0]{title, excerpt, image{..., asset->{...,}}}`, {}, { cache: "no-store" } );
        let offerMetadata = pageData

        return offerMetadata;
    }

    public async FetchGroupMetadata(slug: string): Promise<IRefernceItem> {
        const pageData = await client.fetch(`*[_type == 'groups' && slug.current == '${slug}'][0]{title, excerpt, image{..., asset->{...,}}}`, {}, { cache: "no-store" });
        let groupMetadata = pageData

        return groupMetadata;
    }

    public async FetchDomain(): Promise<ISiteSettings> {
        const domainData = await client.fetch(`*[_type == 'siteSettings'][0]{domain}`);
        let domain = domainData.domain

        return domain;
    }

    public async FetchBusinessName(): Promise<ISiteSettings> {
        const businessName = await client.fetch(`*[_type == 'siteSettings'][0]{companyName}`);
        let name = businessName

        return name;
    }

    public async FetchSitemap(): Promise<IPage[]> {
        const pageMap = await client.fetch(`*[_type == 'page']{slug}`);
        let pages = pageMap

        return pages;
    }

    public async FetchBlogSitemap(): Promise<IRefernceItem[]> {
        const blogMap = await client.fetch(`*[_type == 'post']{slug}`);
        let blogs = blogMap

        return blogs;
    }

    public async FetchOfferSitemap(): Promise<IRefernceItem[]> {
        const offerMap = await client.fetch(`*[_type == 'offers']{slug}`);
        let offers = offerMap

        return offers;
    }

    public async FetchGroupSitemap(): Promise<IRefernceItem[]> {
        const groupMap = await client.fetch(`*[_type == 'groups']{slug}`);
        let groups = groupMap

        return groups;
    }
}

export default MetadataService;