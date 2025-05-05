function BooksFilter({ filter, setFilter, category, setCategory }) {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-2 sm:gap-0">
      <div className="flex sm:gap-4 gap-2">
        {["All", "Available", "New"].map((label) => (
          <FilterTab
            key={label}
            label={label}
            filter={filter}
            handelClick={() => setFilter(label)}
          />
        ))}
      </div>

      <div className="flex items-center sm:gap-4 gap-2">
        <label htmlFor="category" className="text-sm text-gray-600">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className=" sm:px-4 sm:py-2 px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F123F] text-sm sm:text-base"
        >
          <option value="">All</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Non-Fiction</option>
          <option value="textbook">Textbook</option>
          <option value="periodical">News</option>
          {/* <option value="audit">Audit</option> */}
        </select>
      </div>
    </div>
  );
}

export default BooksFilter;

export const FilterTab = function ({ label, filter, handelClick }) {
  return (
    <span
      onClick={handelClick}
      className={`cursor-pointer sm:text-base block sm:px-4 sm:py-2 rounded-md border border-gray-300 px-2 py-1 text-sm ${
        filter === label && "border-transparent text-white bg-[#0F123F]"
      }`}
    >
      {label}
    </span>
  );
};

/*

<span className="sm:text-base block sm:px-4 sm:py-2 rounded-md border border-transparent text-white bg-[#0F123F] px-2 py-1 text-sm">
          All
        </span>
        <span className="sm:text-base block sm:px-4 sm:py-2 rounded-md border border-gray-300 px-2 py-1 text-sm">
          Available
        </span>
        <span className="sm:text-base block sm:px-4 sm:py-2 rounded-md border border-gray-300 px-2 py-1 text-sm">
          New
        </span>

*/
