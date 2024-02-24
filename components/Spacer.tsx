import { ISpacer } from "../_lib/types/types";

const Spacer = (props: ISpacer) => {
  const { Size } = props;

  const getClassName = () => {
    switch (Size) {
      case 'small':
        return 'py-2 md:py-6';
      case 'medium':
        return 'py-4 sm:py-12';
      case 'large':
        return 'py-8 sm:py-16';
      default:
        return '';
    }
  };

  return <div key={props._key} className={getClassName()}></div>;
};

export default Spacer;
