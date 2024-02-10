"use client";

import { ContentType } from "@/model/Content";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
type props = {
  content: ContentType[];
};

const Content = ({ content }: props) => {
  return (
    <div className="flex flex-col gap-8 mb-8">
      {content.map((content, index) => (
        <div className="flex flex-col gap-8" key={index}>
          <div>
            <p className="font-semibold">You</p>
            <p className="leading-7 font-light whitespace-pre-wrap text-gray-200">
              {content.question}
            </p>
          </div>
          <div>
            <p className="font-semibold">four58</p>
            <Markdown
              className="leading-7 font-light max-w-xl text-gray-200 prose dark:prose-invert"
              children={content.answer}
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={oneDark}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
