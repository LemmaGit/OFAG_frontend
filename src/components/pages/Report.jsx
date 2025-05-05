import { useState } from "react";
import { Tab } from "../GeneralLayout/SmallNav";
import { RiBook3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { BsArrowCounterclockwise } from "react-icons/bs";
import NewlyAcquiredBooks from "../GeneralLayout/NewlyAcquiedBooks";
import NewlyRegisteredPatrons from "../GeneralLayout/NewlyRegisteredPatrons";
import MostlyCirculatedBooks from "../GeneralLayout/MostlyCirculatedBooks";

function Report() {
  const [activeTab, setActiveTab] = useState("Newly Acquired Books");
  function handler(tab) {
    setActiveTab(tab);
  }
  return (
    <>
      <nav className="bg-[#0F123F] text-white shadow-lg rounded-lg max-w-fit mx-auto p-2 mt-4">
        <ul className="flex items-center justify-center gap-6">
          <Tab
            activeTab={activeTab}
            tab="Newly Acquired Books"
            handler={handler}
            to="#"
          >
            <RiBook3Line className="w-5 h-5" />
          </Tab>
          <Tab
            activeTab={activeTab}
            tab="Newly Registered Patrons"
            handler={handler}
            to="#"
          >
            <FaRegUser className="w-5 h-5" />
          </Tab>
          <Tab
            activeTab={activeTab}
            tab="Mostly Circulated Books"
            handler={handler}
            to="#"
          >
            <BsArrowCounterclockwise className="w-5 h-5" />
          </Tab>
        </ul>
      </nav>

      <div className="mt-4">
        {activeTab === "Newly Acquired Books" && <NewlyAcquiredBooks />}
        {activeTab === "Newly Registered Patrons" && <NewlyRegisteredPatrons />}
        {activeTab === "Mostly Circulated Books" && <MostlyCirculatedBooks />}
      </div>
    </>
  );
}

export default Report;
