import { Disclosure, Transition } from "@headlessui/react";
import React from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { IFaq } from "../_lib/types/types";

const FaqPageComponent = ({ Faqs }: { Faqs: IFaq[] }) => {
  return (
    <section className="col-span-12 mt-8 sm:mt-16">
      {Faqs.map((faq: IFaq) => (
        <Disclosure as="div" key={faq.question}>
          {({ open }) => (
            <div className="my-2">
              <Disclosure.Button className="flex w-full group justify-between items-center rounded-app border border-accent transition-scale-small shadow-app p-2 hyphenate">
                <span>{faq.question}</span>
                {open ? (
                  <FiChevronDown className="w-5 flex-shrink-0  transition-colors ease-in-out duration-300" />
                ) : (
                  <FiChevronRight className="w-5 flex-shrink-0 transition-colors ease-in-out duration-300" />
                )}
              </Disclosure.Button>
              <Transition
                enter="transition duration-300 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="p-2 rounded-app">
                  {faq.answer}
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      ))}
    </section>
  );
};

export default FaqPageComponent;
