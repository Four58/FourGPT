"use client";

import Image from "next/image";
import SendIcon from "@public/icon/send-icon.png";
import UploadIcon from "@public/icon/upload-icon.png";
import { useEffect, useRef, KeyboardEvent } from "react";

type props = {
  submit: (userInput: string | undefined) => void;
};

const TextInput = ({ submit }: props) => {
  const userInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (userInput.current) {
      userInput.current.focus();
    }
  }, []);

  const handleInputChange = () => {
    if (userInput.current) {
      userInput.current.style.height = "auto"; // Reset height to auto to recalculate rows
      userInput.current.style.height = `${userInput.current.scrollHeight}px`;
      userInput.current.style.maxHeight = "100px";
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmitHandler();
    }
  };

  const onSubmitHandler = () => {
    if (!userInput.current?.value) return;
    submit(userInput.current.value);
    userInput.current.value = "";
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="z-10 flex w-96 lg:w-[640px] self-center p-2 border-[1px] bg-black rounded-2xl border-gray-700"
    >
      <div className="flex gap-2 w-full">
        <div className="p-1 hover:bg-gray-700 self-end rounded-full cursor-pointer">
          <input
            type="file"
            accept="image/*,.pdf"
            className=" w-4 h-4 opacity-0 cursor-pointer absolute"
          />
          <Image
            src={UploadIcon}
            alt="upload icon"
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <textarea
          rows={1}
          onInput={handleInputChange}
          ref={userInput}
          onKeyDown={handleKeyPress}
          placeholder="Ask anything :)"
          className="bg-transparent self-center resize-none text-white text-sm outline-none focus:outline-none w-full"
        />
      </div>
      <button
        type="submit"
        onClick={onSubmitHandler}
        className="bg-gray-500 self-end rounded-full p-1 hover:bg-gray-300 cursor-pointer"
      >
        <Image src={SendIcon} alt="send icon" className="w-4 h-4" />
      </button>
    </form>
  );
};

export default TextInput;
