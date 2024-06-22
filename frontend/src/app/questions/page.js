"use client";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="absolute bottom-4 right-4 text-xs">
        *Please note that we do not support any unethical activities
      </div>
      <div className="flex flex-col gap-6 font-semibold absolute top-[37vh] left-[10vw]">
        <div className="text-[var(--primary-color)] text-6xl">Lie Down</div>
        <div className="flex flex-row gap-4">
          <div className="flex text-3xl font-normal items-end text-[var(--secondary-color)]">
            while you
          </div>{" "}
          <div className="text-6xl min-w-[600px] text-[var(--secondary-color)]">
            Stand Up
          </div>
        </div>
        <SearchBar />
      </div>
    </main>
  );
}
