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
    <div className="flex flex-col self-start mt-8 h-full">
      {content.map((content, index) => (
        <div
          className="flex flex-col gap-8 px-6 sm:px-10 w-svw sm:w-full pb-8"
          key={index}
        >
          <div>
            <p className="font-semibold text-white">You</p>
            <p className="leading-7 font-light whitespace-pre-wrap text-gray-200">
              {content.question}
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">four58</p>
            <Markdown
              className="leading-7 font-light max-w-xl text-gray-200"
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      language={match[1]}
                      style={oneDark}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content.answer}
            </Markdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
