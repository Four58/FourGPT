"use client";

import { useRouter, usePathname } from "next/navigation";

const Navigation = [
  {
    label: "FourGPT",
    url: "/",
  },
  {
    label: "About me",
    url: "/about",
  },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex p-2 gap-4 border-b-[1px] border-gray-700">
      {Navigation.map((item, index) => (
        <div
          className={`px-4 py-1 rounded-3xl shadow hover:bg-gray-600 cursor-pointer ${
            pathname === item.url ? "bg-gray-800" : ""
          }`}
          key={index}
          onClick={() => router.push(item.url)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
