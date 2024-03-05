"use client";
import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextProps,
} from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { resolveHrefFromRef } from "../_lib/resolvers/resolveLinks";
import CustomImage from "./CustomImage";
import { FaHeart } from "react-icons/fa";

const InternalLinkComponent: FC<PortableTextMarkComponentProps<any>> = ({
  value,
  children,
}) => {
  const [_href, setHref] = useState<string>("/");

  useEffect(() => {
    if (value?.reference?._ref) {
      const fetchHref = async () => {
        const href = await resolveHrefFromRef(value.reference._ref);
        setHref(href || "/");
      };

      fetchHref();
    }
  }, [value?.reference?._ref]);

  return (
    <button className="transition-transform duration-300 ease-in-out hover:scale-105">
      <Link href={_href}>{children}</Link>
    </button>
  );
};

interface ContentProps {
  content: PortableTextBlock[];
}

const YoutubeComponent: React.FC<{ value: { url: string } }> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player my-4 rounded-app overflow-hidden"
        url={value.url}
        width="100%"
        height="100%"
      />
    </div>
  );
};

const myPortableTextComponents: Partial<PortableTextProps["components"]> = {
  types: {
    youtube: (props) => <YoutubeComponent {...props} />,
    image: ({ value }) => (
      <CustomImage
        {...value}
        width={1280}
        className="h-full mx-auto my-4 rounded-app object-cover"
        alt={value.alt}
      />
    ),
  },
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    normal: ({ children }) => {
      if (!children || /^\s*$/.test(children.toString())) {
        return <br />;
      }
      return <p>{children}</p>;
    },
    blockquote: ({ children }) => (
      <blockquote className="pl-8 border-l-4 border-accent rounded-app italic font-serif text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    textColor: ({ children, value }) => (
      <span style={{ color: value.value }}>{children}</span>
    ),
    highlightColor: ({ children, value }) => (
      <span style={{ background: value.value }}>{children}</span>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code>{children}</code>,
    strike: ({ children }) => <s>{children}</s>,
    link: ({ value, children }) => (
      <a href={value.url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    internalLink: InternalLinkComponent,
  },
  list: {
    bullet: ({ children }) => <ul className="list-none">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg flex items-start text-left">
      <FaHeart className="text-accent mr-2 mt-1 shrink-0" />    
        {children}
      </li>
    ),
    number: ({ children }) => <li className="text-lg">{children}</li>,
  },
};

export const Content: FC<ContentProps> = ({ content }) => {
  return (
    <div className="my-content">
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  );
};
