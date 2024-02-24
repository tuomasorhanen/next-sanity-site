import { client } from "../client/client";

class HeroService {
    public async Fetch(slug: string) {
        let HeroData = await client.fetch(
            `*[_type == 'page' && slug.current == '${slug}'][0] {
                hero {
                  ...,
                  buttons[]->{
                    _id,
                    callToAction,
                    linkType,
                    navigateToUrl,
                    image,
                    navigateToPage->{
                      slug{
                        current
                      }
                    }
                  }
                }
              }`, {}, { cache: "no-store" } 
        );
        return HeroData.hero;
    }
}

export default HeroService;