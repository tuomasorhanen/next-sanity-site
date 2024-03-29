"use client";
import Link from "next/link";
import { ICallToAction } from "../_lib/types/types";
import CustomImage from "./CustomImage";
import React from "react";
import { track } from "@vercel/analytics";
import { sendGTMEvent } from '@next/third-parties/google'


interface ButtonRendererProps {
  button: ICallToAction;
  className?: string;
}

const ButtonRenderer: React.FC<ButtonRendererProps> = ({
  button,
  className,
}) => {

  try {
    const {
      callToAction,
      navigateToPage,
      linkType,
      navigateToUrl,
      image,
      style,
      buttonName,
    } = button;
    const styleClassName = style === "style1" ? "button" : "button2 text-text";
    const buttonClass = `${className} ${styleClassName}`;

    switch (linkType) {
      case "internal":
        return (
          <Link href={navigateToPage || "/etusivu"}>
            <button className={`transition-scale`}>
              {image?.asset ? (
                <div
                  onClick={() => {
                    track(buttonName);
                    sendGTMEvent({ event: 'buttonClicked', value: {buttonName} })
                  }}
                  className={`${className}`}
                >
                  <CustomImage
                    {...image}
                    alt={callToAction}
                    width={50}
                    className="object-cover w-6"
                  />
                </div>
              ) : (
                <span
                  onClick={() => {
                    track(buttonName);
                    sendGTMEvent({ event: 'buttonClicked', value: {buttonName} })
                  }}
                  className={buttonClass}
                >
                  {callToAction}
                </span>
              )}
            </button>
          </Link>
        );
      case "external":
        return (
          <a href={navigateToUrl} className={`transition-scale`}>
            {image?.asset ? (
              <button
                onClick={() => {
                  track(buttonName);
                  sendGTMEvent({ event: 'buttonClicked', value: {buttonName} })
                }}
                className={`${className}`}
              >
                <CustomImage
                  {...image}
                  alt={callToAction}
                  width={50}
                  className="object-cover w-6"
                />
              </button>
            ) : (
              <span
                onClick={() => {
                  track(buttonName);
                  sendGTMEvent({ event: 'buttonClicked', value: {buttonName} })
                }}
                className={buttonClass}
              >
                {callToAction}
              </span>
            )}
          </a>
        );
      default:
        console.warn("Received an unprocessable button:", button);
        return (
          <span className={`button bg-red-500 text-white`}>Broken button</span>
        );
    }
  } catch (error) {
    console.error("Error rendering button:", error);
    return <></>;
  }
};

export default ButtonRenderer;
