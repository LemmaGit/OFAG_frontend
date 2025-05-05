import { useState } from "react";
import Layout from "../Layout";
import { Tab } from "../../GeneralLayout/SmallNav";
import { IoList } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import Books from "./Books";
import ManageBooks from "./ManageBooks";
import { getBooks } from "../../../helpers/librarian";
import useFetch from "../../../hooks/useFetch";

function BooksMgt() {
  const {
    isLoading,
    isError,
    data: { books = [] } = {},
  } = useFetch("books", getBooks);
  const [activeTab, setActiveTab] = useState("Books List");
  function handler(tab) {
    setActiveTab(tab);
  }

  return (
    <Layout>
      <nav className="bg-[#0F123F] text-white shadow-lg rounded-lg max-w-fit mx-auto p-2 mt-4">
        <ul className="flex items-center justify-center gap-6">
          <Tab activeTab={activeTab} tab="Books List" handler={handler} to="#">
            <IoList className="w-5 h-5" />
          </Tab>
          <Tab
            activeTab={activeTab}
            tab="Manage Books"
            handler={handler}
            to="#"
          >
            <LuNotebookPen className="w-5 h-5" />
          </Tab>
        </ul>
      </nav>

      <div className="mt-4">
        {activeTab === "Books List" && (
          <Books isLoading={isLoading} isError={isError} books={books} />
        )}
        {activeTab === "Manage Books" && (
          <ManageBooks isLoading={isLoading} isError={isError} books={books} />
        )}
      </div>
    </Layout>
  );
}

export default BooksMgt;
