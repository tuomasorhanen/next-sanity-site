"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMenu } from "../../_lib/types/types";
import CustomImage from "../CustomImage";

const Header = (props: IMenu) => {
  const { menu, logo } = props;
  const [navOpen, setNavOpen] = useState(false);
  const [openSubPage, setOpenSubPage] = useState(null);
  const [isMobileView, setIsMobileView] = useState(true);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const processedItems = menu
    .filter((item) => item.showInMenu)
    .sort((a, b) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0));

  const renderDesktopNav = () => (
    <nav className={`fixed top-0 z-40 w-full bg-bg border-2 border-b-accent hidden md:block`}>
      <div className="flex justify-between py-1">
        <Link href="/" className="z-40 flex items-center">
          <CustomImage
            {...logo}
            alt={logo.alt}
            width={150}
            className="mx-10 w-10 hover:scale-105"
          />
        </Link>
        <div className="z-40" id="navbar-default">
          <ul className="mx-10 my-2 flex">
            {processedItems.map((item) => {
              return (
                <li key={item.slug.current} className="group relative">
                  <Link href={"/" + item.slug.current} aria-current="page">
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

  const renderMobileNav = () => {
    const toggleSubPages = (slug) => {
      if (openSubPage === slug) {
        setOpenSubPage(null);
      } else {
        setOpenSubPage(slug);
      }
    };

    return (
      <nav className="nav z-40 md:hidden">
        <div className="nav-container">
          <div className="navbar absolute z-50 flex items-center justify-between">
            <Link href="/">
              <CustomImage
                {...logo}
                alt={logo.alt}
                width={150}
                className="w-10"
              />
            </Link>
            <div className="flex items-center">
              <div className="menu-toggle" onClick={() => setNavOpen(!navOpen)}>
                <div className={navOpen ? "hamBox hamBoxOpen" : "hamBox"}>
                  <span
                    className={
                      navOpen ? `lineTop spin bg-bg` : `lineTop bg-black`
                    }
                  ></span>
                  <span
                    className={
                      navOpen ? `lineBottom spin bg-bg` : `lineBottom bg-black`
                    }
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="nav-overlay absolute z-40 h-full w-full"
            style={{
              top: navOpen ? "0" : "-100%",
              transitionDelay: navOpen ? "0s" : "0s",
            }}
          >
            <ul className="nav-links">
              {processedItems.map((item, index) => (
                <li className="nav-item" key={item.slug.current}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={"/" + item.slug.current}
                      onClick={() => setNavOpen(!navOpen)}
                      style={{
                        top: navOpen ? "0" : "120px",
                        transitionDelay: navOpen
                          ? `${0.8 + index * 0.1}s`
                          : "0s",
                      }}
                    >
                      {item.name}
                    </Link>

                    {item.hasSubPages && (
                      <button
                        onClick={() => toggleSubPages(item.slug.current)}
                        className="chevron-button"
                        style={{
                          top: navOpen ? "0" : "120px",
                          transitionDelay: navOpen
                            ? `${0.8 + index * 0.1}s`
                            : "0s",
                        }}
                      >
                        <svg
                          className={`ml-2 h-6 w-6 transform ${
                            openSubPage === item.slug.current ? "rotate-90" : ""
                          }`}
                          fill="none"
                          stroke="white"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="nav-item-wrapper"></div>
                  {item.hasSubPages && item.subPages && (
                    <ul
                      className={`submenu-transition ${
                        openSubPage === item.slug.current
                          ? "submenu-open mb-2"
                          : "max-h-0"
                      }`}
                    >
                      {item.subPages.map((subItem) => (
                        <li
                          key={subItem._id}
                          className="nav-sub-item py-1 pl-4 text-left text-sm"
                        >
                          <Link
                            href={"/" + subItem.slug.current}
                            onClick={() => setNavOpen(!navOpen)}
                          >
                            {subItem.name}
                          </Link>
                          <div className="nav-item-wrapper"></div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  return <>{isMobileView ? renderMobileNav() : renderDesktopNav()}</>;
};

export default Header;
