"use client";
import Link from "next/link";
import { useState } from "react";
import CustomImage from "../CustomImage";
import { IMenu } from "../../_lib/types/types";

const MobileNav = ({ menu, logo }: IMenu) => {
    const [navOpen, setNavOpen] = useState(false);
    const [openSubPage, setOpenSubPage] = useState<string | null>(null);
    
    const toggleSubPages = (slug: string) => {
        setOpenSubPage(openSubPage === slug ? null : slug);
    };

    const processedItems = menu
        .filter((item) => item.showInMenu)
        .sort((a, b) => (a.menuOrder ?? 0) - (b.menuOrder ?? 0));

    return (
      <nav className="nav z-40 md:hidden" aria-label="Primary navigation">
        <div className="nav-container">
          <div className="navbar absolute z-50 flex items-center justify-between">
            <Link href="/" aria-label="logo and home navigation">
              <CustomImage
            {...logo}
            alt={logo.alt}
            width={550}
            aspectRatio={5.5/1}
            className="h-10 w-auto"
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
                    aria-label={item.name}
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
                        aria-label="toggle subpages"
                        title="toggle subpages"
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

export default MobileNav;