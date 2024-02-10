import { useEffect, useRef, useState } from "react";
import { ContentType } from "@/model/Content";

type props = {
  content: ContentType[];
};

const useAutoScrollToBottom = ({ content }: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentLength, setContentLength] = useState(content.length);
  const [prevScrollHeight, setPrevScrollHeight] = useState(
    ref.current?.scrollHeight || 0
  );

  useEffect(() => {
    if (!ref.current) return;
    // scroll to bottom when new prompt created
    if (content.length > contentLength) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.clientHeight;
      setContentLength(content.length);
    }

    const scrollToBottom = () => {
      if (ref.current) {
        const { scrollHeight, clientHeight, scrollTop } = ref.current;
        setPrevScrollHeight(scrollHeight); //using prevScrollHeight instead of scrollHeight directly, make it correspond with scrollTop and clientHeight correctly
        const isAtBottom = scrollTop + clientHeight >= prevScrollHeight;
        if (isAtBottom) {
          ref.current.scrollTop = scrollHeight - clientHeight;
        }
      }
    };

    scrollToBottom();
  }, [content]);

  return [ref];
};

export default useAutoScrollToBottom;
