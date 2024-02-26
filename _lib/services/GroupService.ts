import { client } from "../client/client";

class GroupService {
    public async Fetch() {
        let Blogs = await client.fetch(
            `*[_type == 'groups']`, {}, { cache: "no-store" } 
        );

        return Blogs;
    }
}

export default GroupService;