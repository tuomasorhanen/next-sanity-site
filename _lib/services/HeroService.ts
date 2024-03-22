import { client } from "../client/client";
import { IHero } from "../types/types";

class HeroService {
    public async Fetch(slug: string): Promise<IHero> {
        let HeroData = await client.fetch(
            `*[slug.current == '${slug}'][0] {
                hero {
                  ...,
                  buttons[]->{
                    _id,
                    callToAction,
                    linkType,
                    navigateToUrl,
                    image,
                    style,
                    navigateToPage->{
                      slug{
                        current
                      }
                    }
                  }
                }
              }`, {}, { cache: "no-store" } 
        );

        if (!HeroData) {
            return null;
        }

        return HeroData.hero;
    }
}

export default HeroService;