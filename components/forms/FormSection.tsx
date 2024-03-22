import useFadeIn from '../../_lib/hooks/useFadeIn';
import { IContactForm } from '../../_lib/types/types';
import DynamicForm from './DynamicForm';

const FormSection = (props: IContactForm) => {
  const { layout, form, animation} = props;

  const fadeInRef = useFadeIn();

  const sectionClassName = `col-span-12 mt-8 sm:mt-16 ${animation === 'fade-in' ? 'hidden-initial' : ''}`;
  const sectionProps = animation === 'fade-in' ? { ref: fadeInRef } : {};

  switch (layout) {
    case 'simple-right':
      return (
        <div className={sectionClassName} {...sectionProps}>
          <DynamicForm form={form} />
        </div>
      );
    default:
      return <></>;
  }
};

export default FormSection;
