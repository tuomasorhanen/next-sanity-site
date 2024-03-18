"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { IMenu } from "../../_lib/types/types";
import { FaLinkedin, FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";

const socialMediaIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedIn: FaLinkedin,
  x: FaXTwitter,
  youtube: FaYoutube,
  phone: FaPhone,
  email: FaEnvelope,
};

const year = new Date().getFullYear();

const MyFooter = (props: IMenu) => {
  const { menu, footer } = props;
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const locations = document.querySelectorAll(".location-card");

      const isOutside = Array.from(locations).every(
        (location) => !location.contains(target)
      );
      if (isOutside) {
        setActiveLocation(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const socialMediaLinks = footer.socialMedia.map((media) => {
    const Icon = socialMediaIcons[media.name.toLowerCase()];
    return (
      <a
        href={media.url}
        className="hover:text-accent transition-colors ease-in-out duration-300"
        aria-label={media.name}
        key={media._key}
      >
        <span className="sr-only">{media.name}</span>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </a>
    );
  });

  if (footer.contact.showPhoneInFooter && footer.contact.phone) {
    socialMediaLinks.push(
      <div className="relative group hover:text-accent transition-colors ease-linear duration-300">
        <a
          href={`tel:${footer.contact.phone}`}
          className="flex items-center"
          aria-label={`Call ${footer.contact.phone}`}
        >
          <FaPhone className="h-6 w-6" aria-hidden="true" />
          <span className="absolute bottom-full mb-2 invisible group-hover:visible group-hover:opacity-100 transition-all ease-in-out duration-300 delay-150 rounded-app shadow-app bg-accent text-bg py-1 px-2 hidden sm:flex items-center justify-center whitespace-nowrap left-1/2 transform -translate-x-1/2 ">
            {footer.contact.phone}
          </span>
        </a>
      </div>
    );
  }

  if (footer.contact.showEmailInFooter && footer.contact.email) {
    socialMediaLinks.push(
      <div className="relative group hover:text-accent transition-colors ease-in-out duration-300">
        <a
          href={`mailto:${footer.contact.email}`}
          aria-label={`Email ${footer.contact.email}`}
          className="flex items-center"
        >
          <FaEnvelope className="h-6 w-6" aria-hidden="true" />
          <span className="absolute bottom-full mb-2 invisible group-hover:visible group-hover:opacity-100 transition-all ease-in-out duration-300 delay-150 rounded-app shadow-app bg-accent text-bg py-1 px-2 hidden sm:flex items-center justify-center whitespace-nowrap left-1/2 transform -translate-x-1/2 ">
            {footer.contact.email}
          </span>
        </a>
      </div>
    );
  }

  const filteredItems = menu.filter((item) => item.showInFooter);
  const sortedAndFilteredItems = filteredItems.sort(
    (a, b) => a.menuOrder - b.menuOrder || 0
  );

  const updatedItems = sortedAndFilteredItems.map((item) => ({
    ...item,
    slug: {
      current: item.slug.current === "etusivu" ? "/" : item.slug.current,
    },
  }));

  return (
    <footer>
      <div className="mx-auto overflow-visible max-w-7xl px-4 mt-8 sm:mt-16 pb-8">
        <nav
          className="flex columns-2 flex-wrap justify-center space-x-4 sm:space-x-12"
          aria-label="Footer"
        >
          {updatedItems.map((item) => (
            <div key={item.slug.current}>
              <Link href={"/" + item.slug.current}>
                <div className="text-sm leading-6gf forced-color-adjust-nonefddf df hover:opacity-50 transition-opacity ease-in-out duration-300">
                  {item.name}
                </div>
              </Link>
            </div>
          ))}
        </nav>
        <p className="text-center mt-4 text-xs leading-5 opacity-70">
          &copy; {year} {footer.companyName} | All rights reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-10">
          {socialMediaLinks}
        </div>
        {footer.contact.showLocationsInFooter &&
          footer.contact.locations.length > 0 && (
            <div className="mt-4 text-center flex justify-center gap-8">
              {footer.contact.locations.map((location, index) => (
                <button
                  className="relative group hover:text-accent transition-colors ease-in-out duration-300"
                  aria-label={`Location details for ${location.city}`}
                  onClick={() => setActiveLocation(index)}
                  key={index}
                >
                  <p>{location.city}</p>
                  <div
                    className={`z-50 absolute bottom-full transition-all ease-in-out duration-300 rounded-app shadow-app bg-accent text-bg p-2 sm:flex sm:flex-col items-center justify-center left-1/2 transform -translate-x-1/2 ${
                      activeLocation === index
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    } location-card`}
                  >
                    <FaLocationDot
                      className="h-6 w-6 mx-auto"
                      aria-hidden="true"
                    />
                    <p className="whitespace-nowrap mt-2">{location.place}</p>
                    <address className="whitespace-nowrap">
                      {location.address}
                    </address>
                  </div>
                </button>
              ))}
            </div>
          )}
      </div>
    </footer>
  );
};

export default MyFooter;
