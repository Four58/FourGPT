"use client";

import Image from "next/image";
import SendIcon from "@public/icon/send-icon.png";
import UploadIcon from "@public/icon/upload-icon.png";
import { useEffect, useRef, KeyboardEvent, FormEvent } from "react";

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
      userInput.current.style.maxHeight = "170px";
    }
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLTextAreaElement> & FormEvent<HTMLFormElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSubmitHandler(e);
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.current?.value) return;
    submit(userInput.current.value);
    userInput.current.value = "";
    handleInputChange();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="z-10 flex w-full self-center p-2 border-[1px] bg-black rounded-2xl border-gray-700"
    >
      <div className="flex gap-2 w-full">
        <label
          htmlFor="upload-picture"
          className="p-1 relative hover:bg-gray-700 self-end rounded-full cursor-pointer"
        >
          <input
            id="upload-picture"
            type="file"
            accept="image/*,.pdf"
            className="cursor-pointer hidden"
          />
          <Image src={UploadIcon} alt="upload icon" className="w-4 h-4" />
        </label>
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
        className="bg-gray-500 self-end rounded-full p-1 hover:bg-gray-300 cursor-pointer"
      >
        <Image src={SendIcon} alt="send icon" className="w-4 h-4" />
      </button>
    </form>
  );
};

export default TextInput;
