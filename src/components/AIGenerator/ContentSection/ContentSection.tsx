"use client";

import { useEffect, useRef, useState } from "react";
import NoContent from "./NoContent";
import Content from "./Content";
import { ContentType } from "@/model/Content";
import useAutoScrollToBottom from "@/hooks/useAutoScrollToBottom";

type props = {
  content: ContentType[];
};

const ContentSection = ({ content }: props) => {
  const [ref] = useAutoScrollToBottom({ content });
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
