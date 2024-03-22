import React from 'react';
import { IHeadingAndTitle } from '../../_lib/types/types';
import { Content } from '../Content';
import useFadeIn from '../../_lib/hooks/useFadeIn';

const HeadingAndTitle = (props: IHeadingAndTitle) => {
  const { style, content } = props;
  const fadeInRef = useFadeIn();

  switch (style) {
    case 'centered':
      return (
        <section key={props._key} className="col-span-12 mt-8 sm:mt-16 " ref={fadeInRef}>
          <div className="mx-auto max-w-4xl text-center">
            <Content content={content} />
          </div>
        </section>
      );
    case 'left':
      return (
        <section key={props._key} className="col-span-12 mt-8 sm:mt-16 " ref={fadeInRef}>
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
