import React from "react";

function RecentSection() {
  return (
    <div className="space-y-3">
      <h2 className="font-medium text-2xl opacity-75 text-left">Recent</h2>
      <div className="grid gap-x-6 grid-cols-2 grid-rows-[200px]">
        <div className="rounded-xl bg-[url(/img/pic2.jpg)] bg-cover bg-center flex items-end">
          <div className="flex-1 flex items-center justify-between p-3 backdrop-blur-lg rounded-b-2xl">
            <span className="text-lg opacity-50 text-white">New Patron</span>
            <span className="opacity-75 text-white font-bold text-xl">
              Ashly Philips
            </span>
          </div>
        </div>
        <div className="rounded-xl bg-[url(/img/book.jpg)] bg-cover bg-center flex items-end">
          <div className="flex-1 flex items-center justify-between p-3 backdrop-blur-lg rounded-b-2xl">
            <span className="text-lg opacity-50 text-white">New Book</span>
            <span className="text-xl opacity-75 text-white font-bold">
              Willingness
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentSection;
