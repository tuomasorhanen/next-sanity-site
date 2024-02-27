import { client } from "../client/client";

class GroupService {
    public async FetchGroups() {
        let Groups = await client.fetch(
            `*[_type == 'groups']`, {}, { cache: "no-store" } 
        );

        return Groups;
    }

    public async FetchGroup(slug: string) {
        let group = await client.fetch(
            `*[_type == 'groups' && slug.current == '${slug}'][0]`, {}, { cache: "no-store" } 
        );

        return group;
    }
}

export default GroupService;