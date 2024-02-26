import { client } from "../client/client";

class OfferService {
    public async Fetch() {
        let Blogs = await client.fetch(
            `*[_type == 'offers']`, {}, { cache: "no-store" } 
        );

        return Blogs;
    }
}

export default OfferService;