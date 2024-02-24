import { Disclosure } from '@headlessui/react';
import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { IFaqList, IFaq } from '../_lib/types/types';

const Faq = (props: IFaqList) => {
  const { faqList } = props;

  return (
    <section key={props._key} className="mx-auto mt-8 max-w-5xl pb-8 md:pb-16">
      {faqList.map((faq: IFaq) => (
        <Disclosure as="div" key={faq.question} className="px-4 py-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full group justify-between rounded-app bg-secondary px-4 py-2 text-left transition-colors ease-in-out duration-300 text-black hover:bg-layer hover:text-bg">
                <span>{faq.question}</span>
                {open ? (
                  <FiChevronDown className="h-5 w-5 text-black group-hover:text-white transition-colors ease-in-out duration-300" />
                ) : (
                  <FiChevronRight className="h-5 w-5 text-black group-hover:text-white transition-colors ease-in-out duration-300" />
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4">{faq.answer}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </section>
  );
};

export default Faq;
