import { client } from "../client/client";
import { IRefernceItem } from "../types/types";

class BlogService {
    public async FetchBlogs(): Promise<IRefernceItem[]> {
        let Blogs = await client.fetch(
            `*[_type == 'post']`, {}, { cache: "no-store" } 
        );

        return Blogs;
    }

    public async FetchPost(slug: string): Promise<IRefernceItem | null> {
        let Post = await client.fetch(
            `*[_type == 'post' && slug.current == '${slug}'][0]`, {}, { cache: "no-store" } 
        );

        return Post;
    }
}

export default BlogService;