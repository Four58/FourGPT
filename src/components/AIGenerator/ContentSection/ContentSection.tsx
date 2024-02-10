"use client";

import { useEffect, useRef, useState } from "react";
import NoContent from "./NoContent";
import Content from "./Content";
import { ContentType } from "@/model/Content";

type props = {
  content: ContentType[];
};

const ContentSection = ({ content }: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentLength, setContentLength] = useState(content.length);
  const [prevScrollHeight, setPrevScrollHeight] = useState(
    ref.current?.scrollHeight || 0
  );
  useEffect(() => {
    if (!ref.current) return;
    if (content.length > contentLength) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.clientHeight;
      setContentLength(content.length);
    }
    const scrollToBottom = () => {
      if (ref.current) {
        const { scrollHeight, clientHeight, scrollTop } = ref.current;
        setPrevScrollHeight(scrollHeight);
        const isAtBottom = scrollTop + clientHeight >= prevScrollHeight;
        if (isAtBottom) {
          ref.current.scrollTop = scrollHeight - clientHeight;
        }
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

export default ContentSection;
