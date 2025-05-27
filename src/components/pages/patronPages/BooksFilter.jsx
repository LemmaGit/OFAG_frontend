function BooksFilter({
  filter,
  setFilter,
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  smallMargin = false,
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between ${
        smallMargin ? "mb-6" : "my-8"
      } gap-4`}
    >
      {/* Left Section - Filter Tabs */}
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

      {/* Middle Section - Category Dropdown */}
      <div className="flex items-center sm:gap-4 gap-2">
        <label htmlFor="category" className="text-sm text-gray-600">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="sm:px-4 sm:py-2 px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F123F] text-sm sm:text-base"
        >
          <option value="">All</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Non-Fiction</option>
          <option value="textbook">Textbook</option>
          <option value="periodical">News</option>
        </select>
      </div>

      {/* Right Section - Search Field */}
      <div className="relative w-full sm:w-auto sm:min-w-[250px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0F123F] text-sm sm:text-base"
        />
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
