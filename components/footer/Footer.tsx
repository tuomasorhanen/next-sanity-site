import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { IPage } from '../../_lib/types/types';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const socialMediaIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  x: FaXTwitter,
  youtube: FaYoutube
};

const year = new Date().getFullYear();

type IMenuProps = {
  items: IPage[];
  footer: {
    socialMedia: any[];
    companyName: string;
  };
  key?: string;
};

const MyFooter = (props: IMenuProps) => {
  const { items, footer } = props;

  const socialMediaLinks = footer.socialMedia.map((media) => {
    const Icon = socialMediaIcons[media.name.toLowerCase()];
    return <a href={media.url} className="hover:text-accent transition-colors ease-in-out duration-300" key={media._key}>
    <span className="sr-only">{media.name}</span>
    <Icon className="h-6 w-6" aria-hidden="true" />
  </a>
  }
  );

  // First, filter items that should show in the footer
  const filteredItems = items.filter(item => item.showInFooter);

  // Then, sort the filtered items by menuOrder
  const sortedAndFilteredItems = filteredItems.sort((a, b) => {
    if (a.menuOrder && b.menuOrder) {
      return a.menuOrder - b.menuOrder;
    }
    return 0;
  });

  const updatedItems = sortedAndFilteredItems.map(item => {
    if (item.slug.current === 'etusivu') {
      return { ...item, slug: { current: '/' } };
    }
    return item;
  });

  return (
    <footer>
      <div className="mx-auto max-w-7xl overflow-hidden px-4 pt-16 pb-8">
        <nav className="flex columns-2 flex-wrap justify-center space-x-4 sm:space-x-12" aria-label="Footer">
          {updatedItems.map(item => (
            <div key={item.slug.current}>
              <Link href={'/' + item.slug.current}>
                <div className="text-sm leading-6gf forced-color-adjust-nonefddf df hover:opacity-50 transition-opacity ease-in-out duration-300">{item.name}</div>
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
      </div>
    </footer>
  );
};

export default MyFooter;
