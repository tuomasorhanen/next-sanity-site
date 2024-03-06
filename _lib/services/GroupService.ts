import { client } from "../client/client";
import { IRefernceItem } from "../types/types";

class GroupService {
    public async FetchGroups(): Promise<IRefernceItem[]> {
        let Groups = await client.fetch(
            `*[_type == 'groups']`, {}, { cache: "no-store" } 
        );
        return Groups;
    }

    public async FetchGroup(slug: string): Promise<IRefernceItem>{
        let group = await client.fetch(
            `*[_type == 'groups' && slug.current == '${slug}'][0]`, {}, { cache: "no-store" } 
        );
        return group;
    }
}

export default GroupService;