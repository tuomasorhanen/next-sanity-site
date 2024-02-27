import { client } from "../client/client";

class BlogService {
    public async FetchBlogs() {
        let Blogs = await client.fetch(
            `*[_type == 'post']`, {}, { cache: "no-store" } 
        );

        return Blogs;
    }

    public async FetchPost(slug: string) {
        let Post = await client.fetch(
            `*[_type == 'post' && slug.current == '${slug}'][0]`, {}, { cache: "no-store" } 
        );

        return Post;
    }
}

export default BlogService;