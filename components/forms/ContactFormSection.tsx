"use client";
import { useState } from 'react';
import ContactForm from './ContactForm';
import { IContactForm } from '../../_lib/types/types';

const ContactFormSection = (props: IContactForm) => {
  const { _id, layout, _key, thankYouMessage, title, description, buttonText } = props;

  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  switch (layout) {
    case 'simple-right':
      return (
        <div className="mt-16 col-span-12">
          <ContactForm thankYouMessage={thankYouMessage} description={description} title={title}/>
        </div>
      );
    case 'pop-up':
      return (
        <div className="pb-16 text-center">
          <button className="button bg-accent text-white" onClick={toggleModal}>
            {buttonText}
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 z-30 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 px-2">
              <div className="mx-auto max-w-xl rounded-app bg-white p-5">
                <button className="h-full w-full text-right" onClick={toggleModal}>
                  X
                </button>
                <div>
                  <ContactForm thankYouMessage={thankYouMessage} description={description} title={title}/>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    default:
      return <></>;
  }
};

export default ContactFormSection;
