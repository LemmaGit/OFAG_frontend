import React, { useState } from "react";
import { FaUserPlus, FaUsers } from "react-icons/fa"; // Icons for Add Staff and Manage Staff

function NavForLibrarians() {
  const [activeTab, setActiveTab] = useState("Manage Staff");
  function handler(tab) {
    setActiveTab(tab);
  }
  return (
    <nav className="bg-[#0F123F] text-white shadow-lg rounded-lg max-w-fit mx-auto p-2">
      <ul className="flex items-center justify-center gap-6">
        <Tab activeTab={activeTab} tab="Add Staff" handler={handler} to="#">
          <FaUserPlus className="w-5 h-5" />
        </Tab>
        <Tab activeTab={activeTab} tab="Manage Staff" handler={handler} to="#">
          <FaUsers className="w-5 h-5" />
        </Tab>
      </ul>
    </nav>
  );
}

export default NavForLibrarians;

export function Tab({ activeTab, tab, handler, children }) {
  return (
    <li onClick={() => handler(tab)}>
      <div
        className={`flex items-center gap-2 px-4 py-2  ${
          activeTab === tab && "bg-blue-500"
        } ${
          activeTab !== tab && "hover:bg-blue-950"
        } rounded-lg transition-colors duration-200 cursor-pointer`}
      >
        {children}
        <span className="text-base">{tab}</span>
      </div>
    </li>
  );
}
