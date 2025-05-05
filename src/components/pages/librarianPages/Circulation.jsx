import { useState } from "react";
import Layout from "../Layout";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { Tab } from "../../GeneralLayout/SmallNav";
import { LuBookCheck, LuBookPlus, LuGrab } from "react-icons/lu";
import Checkout from "./Checkout";
import Holds from "./Holds";
import CheckedinBooks from "./CheckedinBooks";
import CheckedoutBooks from "./CheckedoutBooks";

function Circulation() {
  const [activeTab, setActiveTab] = useState("Checkedout Books");
  function handler(tab) {
    setActiveTab(tab);
  }
  return (
    <Layout>
      <nav className="bg-[#0F123F] text-white shadow-lg rounded-lg max-w-fit mx-auto p-2 mt-4">
        <ul className="flex items-center justify-center gap-6">
          <Tab activeTab={activeTab} tab="Check Out" handler={handler}>
            <MdOutlineBookmarkAdd className="w-5 h-5" />
          </Tab>
          <Tab activeTab={activeTab} tab="Holds" handler={handler}>
            <LuGrab className="w-5 h-5" />
          </Tab>
          <Tab activeTab={activeTab} tab="Checkedout Books" handler={handler}>
            <LuBookPlus className="w-5 h-5" />
          </Tab>
          <Tab activeTab={activeTab} tab="Checkedin Books" handler={handler}>
            <LuBookCheck className="w-5 h-5" />
          </Tab>
        </ul>
      </nav>

      <div className="mt-4">
        {activeTab === "Check Out" && <Checkout />}
        {activeTab === "Holds" && <Holds />}
        {activeTab === "Checkedin Books" && <CheckedinBooks />}
        {activeTab === "Checkedout Books" && <CheckedoutBooks />}
      </div>
    </Layout>
  );
}

export default Circulation;
