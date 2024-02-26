import { client } from "../client/client";

class OfferPostService {
    public async Fetch(slug: string) {
        let Post = await client.fetch(
            `*[_type == 'offers' && slug.current == '${slug}'][0]`, {}, { cache: "no-store" } 
        );

        return Post;
    }
}

export default OfferPostService;