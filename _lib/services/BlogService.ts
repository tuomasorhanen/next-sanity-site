import { client } from "../client/client";

class BlogService {
    public async Fetch() {
        let Blogs = await client.fetch(
            `*[_type == 'post']`, {}, { cache: "no-store" } 
        );

        return Blogs;
    }
}

export default BlogService;