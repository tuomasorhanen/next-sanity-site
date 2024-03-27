import { client } from "../client/client";
import { IPost} from "../types/types";

class BlogService {
    public async FetchBlogs(): Promise<IPost[]> {
        let Blogs = await client.fetch(
            `*[_type == 'post']{..., author->{...}}`, {}, { cache: "no-store"}
        );

        return Blogs;
    }

    public async FetchPost(slug: string): Promise<IPost | null> {
        let Post = await client.fetch(
            `*[_type == 'post' && slug.current == '${slug}'][0]{..., author->{...}}`, {}, { cache: "no-store"}
        );

        return Post;
    }
}

export default BlogService;