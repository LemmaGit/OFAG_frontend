import { useState } from "react";
import { Tab } from "./../../GeneralLayout/SmallNav";
import { IoLibraryOutline } from "react-icons/io5";
import { FiFileText, FiGlobe } from "react-icons/fi";
import InLibraryBooks from "./InLibraryBooks";
import DigitalBooks from "./DigitalBooks";
import PdfsList from "../PdfsList";
function BooksMgt() {
  const [activeTab, setActiveTab] = useState("In-Library Books");
  function handler(tab) {
    setActiveTab(tab);
  }
  return (
    <>
      <nav className="bg-[#0F123F] text-white shadow-lg rounded-lg max-w-fit mx-auto p-2 mt-4">
        <ul className="flex items-center justify-center gap-6">
          <Tab activeTab={activeTab} tab="In-Library Books" handler={handler}>
            <IoLibraryOutline className="w-5 h-5" />
          </Tab>
          <Tab
            activeTab={activeTab}
            tab="Uploaded PDFS"
            handler={handler}
            to="#"
          >
            <FiFileText className="w-5 h-5" />
          </Tab>
          <Tab activeTab={activeTab} tab="Digital Library" handler={handler}>
            <FiGlobe className="w-5 h-5" />
          </Tab>
        </ul>
      </nav>

      <div className="mt-4">
        {activeTab === "In-Library Books" && <InLibraryBooks />}
        {activeTab === "Digital Library" && <DigitalBooks />}
        {activeTab === "Uploaded PDFS" && <PdfsList isPatron={true} />}
      </div>
    </>
  );
}

export default BooksMgt;
