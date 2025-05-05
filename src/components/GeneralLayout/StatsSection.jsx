import React from "react";
import { IoLibraryOutline } from "react-icons/io5";
import { MdOutlinePeople } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";

function StatsSection() {
  return (
    <div className="bg-transparent col-start-2 col-span-1 row-start-3 row-span-1 border border-black/10 rounded-2xl">
      <div className="grid grid-cols-[0.1fr_0.8fr_0.1fr] gap-y-2 overflow-auto">
        <div className=""></div>
        <main className="py-4 space-y-4">
          <div className="space-y-3">
            <h2 className="font-medium text-2xl opacity-75 text-left">Stats</h2>
            <div className="flex gap-4">
              <div className="border border-black/25 rounded-xl flex-1 p-4">
                <IoLibraryOutline className="w-16 h-16 opacity-75 ml-auto" />
                <div className="flex flex-col gap-[2px] opacity-75 mt-2">
                  <span className="font-bold text-3xl">127+</span>
                  <span className="text-lg opacity-50">Total Books</span>
                </div>
              </div>
              <div className="border border-black/25 rounded-xl flex-1 p-4">
                <MdOutlinePeople className="w-16 h-16 opacity-75 ml-auto" />
                <div className="flex flex-col gap-[2px] opacity-75 mt-2">
                  <span className="font-bold text-3xl">23</span>
                  <span className="text-lg opacity-50">Staff Members</span>
                </div>
              </div>
              <div className="border border-black/25 rounded-xl flex-1 p-4">
                <BiTimeFive className="w-16 h-16 opacity-75 ml-auto" />
                <div className="flex flex-col gap-[2px] opacity-75 mt-2">
                  <span className="font-bold text-3xl">12</span>
                  <span className="text-lg opacity-50">Overdues</span>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className=""></div>
      </div>
    </div>
  );
}

export default StatsSection;
