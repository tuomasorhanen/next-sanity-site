import { client } from "../client/client";

class GroupPostService {
    public async Fetch(slug: string) {
        let group = await client.fetch(
            `*[_type == 'groups' && slug.current == '${slug}'][0]`, {}, { cache: "no-store" } 
        );

        return group;
    }
}

export default GroupPostService;