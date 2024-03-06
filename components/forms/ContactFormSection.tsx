import ContactForm from './ContactForm';
import { IContactForm } from '../../_lib/types/types';

const ContactFormSection = (props: IContactForm) => {
  const { layout, thankYouMessage, title, description } = props;

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
