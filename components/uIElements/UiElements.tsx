import React from 'react';
import { IUiElement } from '../../_lib/types/types';


const UiElement = (props: IUiElement) => {
  const { style } = props;

  switch (style) {
    case 'wave':
      return (
        <section key={props._key} className="relative z-10 bg-transparent" style={{ marginTop: '-20.0%' }}>
          <svg viewBox="0 0 1440 320" style={{ position: 'absolute', top: 0, left: 0 }}>
            <path
              fill="transparent"
              stroke="var(--bg-color)"
              strokeWidth="4"
              d="M0,160L120,176C240,192,480,224,720,213.3C960,203,1200,149,1320,122.7L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
          </svg>
          <svg viewBox="0 0 1440 320" style={{ position: 'relative', zIndex: 1 }}>
            <path
              fill="var(--bg-color)"
              d="M0,160L120,176C240,192,480,224,720,213.3C960,203,1200,149,1320,122.7L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
          </svg>
        </section>
      );

    default:
      return <></>;
  }
};

export default UiElement;
