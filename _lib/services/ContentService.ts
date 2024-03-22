import { client } from "../client/client";
import resolveLinks from "../resolvers/resolveButtons";
import resolveReferences from "../resolvers/resolveReferences";

class ContentService {
    public async Fetch(slug: string) {
        let content = await client.fetch(
            `*[slug.current == '${slug}'][0]{content}`, {}, { cache: "no-store" } 
        );

        content = await resolveReferences(content);
        content = await resolveLinks(content);

        return content.content;
    }
}

export default ContentService;
