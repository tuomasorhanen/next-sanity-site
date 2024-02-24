import { client } from "../client/client";
import { ISiteSettings, IPage } from "../types/types";

class MetadataService {

    public async FetchDefaultMetadata() {
        const defaultMetadata = await client.fetch(`*[_type == 'siteSettings'][0]{title, description, image{..., asset->{...,}}, domain, keywords}`);
        let defaultSiteMetadata = defaultMetadata

        return defaultSiteMetadata;
    }

    public async FetchPageMetadata(slug: string) {
        const pageData = await client.fetch(`*[_type == 'page' && slug.current == '${slug}'][0]{metadata{..., image{..., asset->{...,}}}}`, {}, { cache: "no-store" } );
        let metadata = pageData

        return metadata;
    }
}

export default MetadataService;