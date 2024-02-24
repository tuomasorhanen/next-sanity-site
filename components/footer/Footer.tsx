import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { IPage } from '../../_lib/types/types';

type IMenuProps = {
  items: IPage[];
  key?: string;
};

const MyFooter = (props: IMenuProps) => {
  const { items } = props;

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
    <footer className="">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-8 lg:px-8">
        <nav className="-mb-6 flex columns-2 flex-wrap justify-center space-x-4 sm:space-x-12" aria-label="Footer">
          {updatedItems.map(item => (
            <div key={item.slug.current}>
              <Link href={'/' + item.slug.current} className="pb-6">
                <div className="text-sm leading-6 text-gray-700 hover:text-gray-900">{item.name}</div>
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-700">
          &copy; 2024 Fysiosarianne | All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-10">
          <a href="https://www.facebook.com/" className="text-gray-700 hover:text-accent">
            <span className="sr-only">Facebook</span>
            <FaFacebookF className="h-6 w-6" aria-hidden="true" />
          </a>
          <a href="https://www.instagram.com/" className="text-gray-700 hover:text-accent">
            <span className="sr-only">Instagram</span>
            <FaInstagram className="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
