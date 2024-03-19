import { client } from "../client/client";
import { IGroup, IRefernceItem } from "../types/types";

class GroupService {
    public async FetchGroups(): Promise<IGroup[]> {
        let Groups = await client.fetch(
            `*[_type == 'groups']{..., price{..., location->{...}}}`,
        );
        return Groups;
    }

    public async FetchGroup(slug: string): Promise<IGroup>{
        let group = await client.fetch(
            `*[_type == 'groups' && slug.current == '${slug}'][0]{..., price{..., location->{...}}}`,
        );
        return group;
    }
}

export default GroupService;