import { useEffect, useRef, useState } from "react";
import { ContentType } from "@/model/Content";

type props = {
  content: ContentType[];
};

const useAutoScrollToBottom = ({ content }: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentLength, setContentLength] = useState(content.length);
  const prevScrollHeight = useRef<number>(ref.current?.scrollHeight || 0);

  useEffect(() => {
    if (!ref.current) return;
    // scroll to bottom when new prompt created
    if (content.length > contentLength) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.clientHeight;
      setContentLength((prev) => prev + 1);
    }

    const { scrollHeight, clientHeight, scrollTop } = ref.current;
    setTimeout(() => {
      prevScrollHeight.current = scrollHeight;
    }, 100);
    const isAtBottom = scrollTop + clientHeight >= prevScrollHeight.current;
    console.log(scrollTop, clientHeight, prevScrollHeight.current);
    if (isAtBottom) {
      ref.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [content, contentLength]);

  return [ref];
};

export default useAutoScrollToBottom;
