import { client } from "../client/client";

class MenuService {
    public async Fetch() {
        let menu = await client.fetch(
            `*[_type == 'page' && showInMenu == true || showInFooter == true]{ name, slug, menuOrder, title, showInMenu, hasSubPages, showInFooter, subPages[]->{slug, name, _id}}`, {}, { cache: "no-store" } );

        let logo = await client.fetch(
            `*[_type == 'siteSettings'][0]{logo}`);

            return { menu, logo };
        }
}

export default MenuService;