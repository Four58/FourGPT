"use client";

import TextInput from "./TextInput";
import AIContent from "./ContentSection/AIContent";
import { useState } from "react";
import { ContentType } from "@/model/Content";

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
  return (
    <div className="h-screen w-full flex flex-col py-4">
      <p className="ml-4 font-semibold text-gray-300">FourGPT</p>
      <div className="justify-center items-center flex w-full h-full">
        <div className="flex h-full flex-col w-[640px]">
          <AIContent content={content} />
          <div className="w-full mb-3 flex items-center absolute bottom-0">
            <TextInput submit={submitHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorSection;
