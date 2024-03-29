"use client";

import { useRouter } from "next/navigation";
import CreateButton from "./CreateButton";

type props = {
  MockHistoryItem: {
    title: string;
    url: string;
  }[];
};

const HistoryBar = ({ MockHistoryItem }: props) => {
  const router = useRouter();
  return (
    <div className="hidden bg-gray-900 lg:flex flex-col px-2 py-4 border-r-[1px] gap-3 h-full border-gray-700">
      <CreateButton />
      <p className="text-xs text-gray-300">History</p>
      {MockHistoryItem.map((item) => (
        <div
          className="shadow-2xl rounded-md cursor-pointer py-1 w-52 text-center bg-slate-800 hover:bg-slate-600"
          onClick={() => router.push("/")}
          key={item.url}
        >
          <p className="text-sm text-white truncate px-2">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default HistoryBar;
