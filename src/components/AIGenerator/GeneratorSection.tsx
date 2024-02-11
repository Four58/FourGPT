"use client";

import TextInput from "./TextInput";
import ContentSection from "./ContentSection/ContentSection";
import { useState } from "react";
import { ContentType } from "@/model/Content";
import useAutoScrollToBottom from "@/hooks/useAutoScrollToBottom";

const GeneratorSection = () => {
  const [content, setContent] = useState<ContentType[]>([]);

  const submitHandler = async (userInput: string | undefined) => {
    try {
      if (userInput === undefined) return;
      setContent((prev) => [...prev, { question: userInput, answer: "" }]);
      console.log(userInput);
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({ content: userInput }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok || !response.body) {
        throw new Error("response failed");
      }
      const reader = response.body.getReader();

      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        const answer = decoder.decode(value);
        setContent((prev) => {
          const latestContentIndex = prev.length - 1;
          const updatedContent = [...prev];
          updatedContent[latestContentIndex] = {
            ...updatedContent[latestContentIndex],
            answer: updatedContent[latestContentIndex].answer + answer,
          };
          return updatedContent;
        });
        if (done) {
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [ref] = useAutoScrollToBottom({ content });

  return (
    <div className="flex h-full flex-col w-full">
      <div
        ref={ref}
        className="w-full h-full flex overflow-y-scroll items-center justify-center"
      >
        <div className="flex justify-center items-center h-full flex-col w-full px-10 md:px-0 md:w-[700px]">
          <ContentSection content={content} />
        </div>
      </div>
      <div className="w-full max-w-4xl place-self-center px-10 mb-3 flex items-center justify-center">
        <TextInput submit={submitHandler} />
      </div>
    </div>
  );
};

export default GeneratorSection;
