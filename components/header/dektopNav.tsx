import Link from "next/link";
import { IMenu } from "../../_lib/types/types";
import CustomImage from "../CustomImage";

const DesktopNav = ({ menu, logo }: IMenu) => {
  const processedItems = menu
    .filter((item) => item.showInMenu)
    .sort((a, b) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0));

  return (
    <nav
      className={`fixed top-0 z-40 w-full bg-bg border-2 border-b-accent hidden md:block`}
      aria-label="Primary site navigation"
    >
      <div className="flex justify-between py-1">
        <Link
          href="/"
          className="z-40 flex items-center"
          aria-label="Back to homepage"
        >
          <CustomImage
            {...logo}
            alt={logo.alt}
            width={550}
            aspectRatio={5.5 / 1}
            className="mx-10 h-12 w-auto hover:scale-105"
          />
        </Link>
        <div className="z-40" id="navbar-default">
          <ul className="mx-10 my-2 flex">
            {processedItems.map((item) => {
              return (
                <li key={item.slug.current} className="group relative">
                  <Link href={"/" + item.slug.current} aria-label={item.name}>
                    <span className="transition-color flex items-center px-2 py-2 text-text duration-300 ease-in-out hover:text-accent">
                      {item.name.toUpperCase()}
                      {item.hasSubPages && (
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </span>
                  </Link>
                  {item.hasSubPages && item.subPages && (
                    <ul className="invisible absolute rounded-app bg-layer border border-accent opacity-0 transition-opacity duration-500 ease-in-out group-hover:visible group-hover:opacity-100">
                      {item.subPages.map((subItem) => (
                        <li key={subItem._id}>
                          <Link href={"/" + subItem.slug.current}>
                            <div className="block px-4 py-2 text-text hover:opacity-50">
                              {subItem.name}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
