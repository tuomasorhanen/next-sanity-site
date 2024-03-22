import React from 'react';
import { IHeadingAndTitle } from '../../_lib/types/types';
import { Content } from '../Content';
import useFadeIn from '../../_lib/hooks/useFadeIn';

const HeadingAndTitle = (props: IHeadingAndTitle) => {
  const { style, content, animation } = props;
  const fadeInRef = useFadeIn();

  const sectionClassName = `col-span-12 mt-8 sm:mt-16 ${animation === 'fade-in' ? 'hidden-initial' : ''}`;
  const sectionProps = animation === 'fade-in' ? { ref: fadeInRef } : {};

  switch (style) {
    case 'centered':
      return (
        <section key={props._key} className={sectionClassName} {...sectionProps}>
          <div className="mx-auto max-w-4xl text-center">
            <Content content={content} />
          </div>
        </section>
      );
    case 'left':
      return (
        <section key={props._key} className={sectionClassName} {...sectionProps}>
          <div className="mx-auto max-w-4xl">
            <Content content={content} />
          </div>
        </section>
      );
    default:
      return <></>;
  }
};

export default HeadingAndTitle;
