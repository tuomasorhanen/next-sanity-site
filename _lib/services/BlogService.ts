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
            `*[_type == 'post' && slug.current == '${slug}'][0]{..., author->{...}}`, {}, { cache: "no-store" } 
        );

        return Post;
    }

    public async FetchPostImage(slug: string): Promise<string | null> {
        let imageUrl = await client.fetch(
            `*[_type == 'post' && slug.current == '${slug}'][0]{
                "imageUrl": image.asset->url
              }`, {}, { cache: "no-store" }
                      );

        return imageUrl.imageUrl;
    }
}

export default BlogService;