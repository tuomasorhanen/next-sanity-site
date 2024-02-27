import { client } from "../client/client";

class OfferService {
    public async FetchOffers() {
        let Offers = await client.fetch(
            `*[_type == 'offers']`, {}, { cache: "no-store" } 
        );

        return Offers;
    }

    public async FetchOfferPost(slug: string) {
        let OfferPost = await client.fetch(
            `*[_type == 'offers' && slug.current == '${slug}'][0]`, {}, { cache: "no-store" } 
        );

        return OfferPost;
    }
}

export default OfferService;