"use client";
import { Disclosure } from '@headlessui/react';
import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { IFaq } from '../_lib/types/types';

const FaqPageComponent = ({ Faqs }: { Faqs: IFaq[] }) => {

  return (
    <section className="col-span-12 mt-8 sm:mt-16">
      {Faqs.map((faq: IFaq) => (
        <Disclosure as="div" key={faq.question}>
          {({ open }) => (
            <div className='my-2'>
              <Disclosure.Button className="flex w-full group justify-between rounded-app border border-accent transition-scale-small shadow-app p-2">
                <span>{faq.question}</span>
                {open ? (
                  <FiChevronDown className="h-5 w-5 transition-colors ease-in-out duration-300" />
                ) : (
                  <FiChevronRight className="h-5 w-5 transition-colors ease-in-out duration-300" />
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="p-2 rounded-app">{faq.answer}</Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </section>
  );
};

export default FaqPageComponent;