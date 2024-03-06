"use client";
import { useState } from 'react';
import ContactForm from './ContactForm';
import { IContactForm } from '../../_lib/types/types';

const ContactFormSection = (props: IContactForm) => {
  const { _id, layout, _key, thankYouMessage, title, description } = props;

  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  switch (layout) {
    case 'simple-right':
      return (
        <div className="mt-16 col-span-12">
          <ContactForm thankYouMessage={thankYouMessage} description={description} title={title}/>
        </div>
      );
    default:
      return <></>;
  }
};

export default ContactFormSection;
