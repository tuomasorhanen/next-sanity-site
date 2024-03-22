import { IContactForm } from '../../_lib/types/types';
import DynamicForm from './DynamicForm';

const FormSection = (props: IContactForm) => {
  const { layout, form} = props;

  switch (layout) {
    case 'simple-right':
      return (
        <div className="mt-8 sm:mt-16 col-span-12 hidden-initial">
          <DynamicForm form={form} />
        </div>
      );
    default:
      return <></>;
  }
};

export default FormSection;
