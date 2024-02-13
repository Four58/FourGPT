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
  return (
    <div className="h-full w-full flex flex-col">
      {content.length !== 0 ? <Content content={content} /> : <NoContent />}
    </div>
  );
};

export default ContentSection;
