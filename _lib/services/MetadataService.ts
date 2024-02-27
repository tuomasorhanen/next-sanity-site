import { client } from "../client/client";

class MetadataService {

    public async FetchDefaultMetadata() {
        const defaultMetadata = await client.fetch(`*[_type == 'siteSettings'][0]{title, description, image{..., asset->{...,}}, domain, keywords}`);
        let defaultSiteMetadata = defaultMetadata

        return defaultSiteMetadata;
    }

    public async FetchPageMetadata(slug: string) {
        const pageData = await client.fetch(`*[slug.current == '${slug}'][0]{metadata{..., image{..., asset->{...,}}}}`, {}, { cache: "no-store" } );
        let metadata = pageData

        return metadata;
    }

    public async FetchBlogPostMetadata(slug: string) {
        const pageData = await client.fetch(`*[_type == 'post' && slug.current == '${slug}'][0]{title, excerpt, image{..., asset->{...,}}}`, {}, { cache: "no-store" } );
        let blogMetadata = pageData

        return blogMetadata;
    }

    public async FetchOfferMetadata(slug: string) {
        const pageData = await client.fetch(`*[_type == 'offers' && slug.current == '${slug}'][0]{title, excerpt, image{..., asset->{...,}}}`, {}, { cache: "no-store" } );
        let offerMetadata = pageData

        return offerMetadata;
    }

    public async FetchGroupMetadata(slug: string) {
        const pageData = await client.fetch(`*[_type == 'groups' && slug.current == '${slug}'][0]{title, excerpt, image{..., asset->{...,}}}`, {}, { cache: "no-store" } );
        let groupMetadata = pageData

        return groupMetadata;
    }
}

export default MetadataService;