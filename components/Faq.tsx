"use client";
import { Disclosure } from '@headlessui/react';
import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { IFaq, IFaqList } from '../_lib/types/types';
import useFadeIn from '../_lib/hooks/useFadeIn';

const Faq = (props: IFaqList) => {
  const { faqList, _key, animation } = props;
  const fadeInRef = useFadeIn();

  const sectionClassName = `col-span-12 mt-8 sm:mt-16 ${animation === 'fade-in' ? 'hidden-initial' : ''}`;
  const sectionProps = animation === 'fade-in' ? { ref: fadeInRef } : {};

  return (
    <section key={props._key} className={sectionClassName} {...sectionProps}>
      {faqList.map((faq: IFaq) => (
        <Disclosure as="div" key={faq.question}>
          {({ open }) => (
            <div className='my-2'>
             <Disclosure.Button className="flex w-full group justify-between items-center rounded-app border border-accent transition-scale-small shadow-app p-2 hyphenate">
                <span>{faq.question}</span>
                {open ? (
                  <FiChevronDown className="w-5 flex-shrink-0  transition-colors ease-in-out duration-300" />
                ) : (
                  <FiChevronRight className="w-5 flex-shrink-0 transition-colors ease-in-out duration-300" />
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

export default Faq;
