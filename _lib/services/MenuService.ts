import { client } from "../client/client";
import { IMenu, IPage, ISiteSettings } from "../types/types";

class MenuService {
  public async Fetch(): Promise<IMenu> {
    let menu: IPage[] = await client.fetch(
      `*[_type == 'page' && showInMenu == true || showInFooter == true]{ name, slug, menuOrder, title, showInMenu, hasSubPages, showInFooter, subPages[]->{slug, name, _id}}`, {}, { cache: "no-store" }
    );

    let logoResult = await client.fetch(
      `*[_type == 'siteSettings'][0]{logo}`
    );
    let logo: IMenu["logo"] = logoResult.logo;

    let footer: Pick<ISiteSettings, 'socialMedia' | 'companyName' | 'contact'> = await client.fetch(
      `*[_type == 'siteSettings'][0]{socialMedia, companyName, contact{..., locations[]->{...}}}`
    );

    return { menu, logo, footer };
  }
}

export default MenuService;
