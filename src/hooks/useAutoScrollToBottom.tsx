import { useEffect, useRef, useState } from "react";
import { ContentType } from "@/model/Content";

type props = {
  content: ContentType[];
};

const useAutoScrollToBottom = ({ content }: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentLength, setContentLength] = useState(content.length);
  const prevScrollTop = useRef<number>(ref.current?.scrollTop || 0);

  useEffect(() => {
    if (!ref.current) return;
    // scroll to bottom when new prompt created
    if (content.length > contentLength) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.clientHeight;
      setContentLength((prev) => prev + 1);
    }

    const { scrollHeight, clientHeight, scrollTop } = ref.current;
    if (scrollTop >= prevScrollTop.current) {
      ref.current.scrollTop = scrollHeight - clientHeight;
      prevScrollTop.current = scrollTop;
    }
  }, [content, contentLength]);

  return [ref];
};

export default useAutoScrollToBottom;
