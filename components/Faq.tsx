import { Disclosure } from '@headlessui/react';
import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { IFaqList, IFaq } from '../_lib/types/types';

const Faq = (props: IFaqList) => {
  const { faqList } = props;

  return (
    <section key={props._key} className="col-span-12 mt-16">
      {faqList.map((faq: IFaq) => (
        <Disclosure as="div" key={faq.question}>
          {({ open }) => (
            <div className='my-2'>
              <Disclosure.Button className="flex w-full group justify-between rounded-app bg-accent p-2">
                <span>{faq.question}</span>
                {open ? (
                  <FiChevronDown className="h-5 w-5 text-black group-hover:text-white transition-colors ease-in-out duration-300" />
                ) : (
                  <FiChevronRight className="h-5 w-5 text-black group-hover:text-white transition-colors ease-in-out duration-300" />
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="border-2 border-accent p-2 rounded-app">{faq.answer}</Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </section>
  );
};

export default Faq;
