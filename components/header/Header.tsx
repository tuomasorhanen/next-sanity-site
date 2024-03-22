import { IMenu } from "../../_lib/types/types";
import DesktopNav from "./dektopNav";
import MobileNav from "./mobileNav";

const Header = (props: IMenu) => {

  return <>
      <DesktopNav {...props} />
      <MobileNav {...props} />
  </>;
};

export default Header;
