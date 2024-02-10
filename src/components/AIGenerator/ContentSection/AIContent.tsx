"use client";

import { useEffect, useRef, useState } from "react";
import NoContent from "./NoContent";
import Content from "./Content";
import { ContentType } from "@/model/Content";

type props = {
  content: ContentType[];
};

const AIContent = ({ content }: props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scrollToBottom = () => {
      if (ref.current) {
        const { scrollHeight, clientHeight } = ref.current;
        ref.current.scrollTop = scrollHeight - clientHeight;
      }
    };

    scrollToBottom();
  }, [content]);
  return (
    <div
      ref={ref}
      className="px-4 h-full w-full flex flex-col overflow-y-auto mt-4 mb-28"
    >
      {content.length !== 0 ? <Content content={content} /> : <NoContent />}
    </div>
  );
};

export default AIContent;
