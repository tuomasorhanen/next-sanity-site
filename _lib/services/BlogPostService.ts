import { client } from "../client/client";

class BlogPostService {
    public async Fetch(slug: string) {
        let Post = await client.fetch(
            `*[_type == 'post' && slug.current == '${slug}'][0]`, {}, { cache: "no-store" } 
        );

        return Post;
    }
}

export default BlogPostService;