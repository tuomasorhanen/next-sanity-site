import React from 'react';
import { IHeadingAndTitle } from '../../_lib/types/types';
import { Content } from '../Content';

const HeadingAndTitle = (props: IHeadingAndTitle) => {
  const { style, content } = props;

  switch (style) {
    case 'centered':
      return (
        <section key={props._key} className="mt-16 ">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <Content content={content} />
          </div>
        </section>
      );
    case 'left':
      return (
        <section key={props._key} className="mt-16 ">
          <div className="mx-auto max-w-4xl px-4">
            <Content content={content} />
          </div>
        </section>
      );
    default:
      return <></>;
  }
};

export default HeadingAndTitle;
