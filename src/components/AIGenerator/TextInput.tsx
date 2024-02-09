"use client";

import Image from "next/image";
import SendIcon from "@public/icon/send-icon.png";
import UploadIcon from "@public/icon/upload-icon.png";
import { FormEvent, useEffect, useRef } from "react";

type props = {
  submit: (userInput: string | undefined) => void;
};

const TextInput = ({ submit }: props) => {
  const userInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userInput.current) {
      userInput.current.focus();
    }
  }, []);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    if (!userInput.current?.value) return;
    e.preventDefault();
    submit(userInput.current.value);
    userInput.current.value = "";
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="z-10 flex w-96 lg:w-[640px] p-2 border-[1px] bg-black rounded-2xl border-gray-700"
    >
      <div className="flex gap-2 w-full">
        <div className="p-1 hover:bg-gray-700 rounded-full cursor-pointer">
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
        <input
          ref={userInput}
          placeholder="Ask anything :)"
          className="bg-transparent text-white text-sm outline-none focus:outline-none w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-500 rounded-full p-1 hover:bg-gray-300 cursor-pointer"
      >
        <Image src={SendIcon} alt="send icon" className="w-4 h-4" />
      </button>
    </form>
  );
};

export default TextInput;
