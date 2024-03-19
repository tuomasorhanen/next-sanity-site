import { client } from "../client/client";
import { IRefernceItem } from "../types/types";

class OfferService {
    public async FetchOffers(): Promise<IRefernceItem[]> {
        let Offers = await client.fetch(
            `*[_type == 'offers']`,
        );

        return Offers;
    }

    public async FetchOfferPost(slug: string): Promise<IRefernceItem> { 
        let OfferPost = await client.fetch(
            `*[_type == 'offers' && slug.current == '${slug}'][0]`,
        );

        return OfferPost;
    }
}

export default OfferService;