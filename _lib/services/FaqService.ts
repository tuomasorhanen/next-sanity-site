import { client } from "../client/client";
import { IFaq } from "../types/types";

class FaqService {
    public async FetchFaqs(): Promise<IFaq[]> {
        let Faqs = await client.fetch(
            `*[_type == 'faq']`, {}, { cache: "no-store" } 
        );

        return Faqs;
    }
}

export default FaqService;