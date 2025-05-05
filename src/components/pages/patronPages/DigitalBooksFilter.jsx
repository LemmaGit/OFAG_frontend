function DigitalBookFilter({
  title,
  setTitle,
  author,
  setAuthor,
  handleSearch,
}) {
  return (
    <div className="flex flex-wrap items-center justify-end mb-6 gap-4 ">
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by Title"
          className="px-4 py-2 rounded-md border border-gray-300 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none w-48 sm:w-64"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Search by Author"
          className="px-4 py-2 rounded-md border border-gray-300 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none w-48 sm:w-64"
        />
        <button
          className="px-4 py-2 rounded-md bg-[#0F123F] text-white text-sm sm:text-base hover:bg-[#1c2060] transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Category Filter */}
      {/* <div className="flex items-center gap-2 sm:gap-4">
        <label htmlFor="category" className="text-sm text-gray-600">
          Category:
        </label>
        <select
          id="category"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0F123F]"
        >
          <option value="">All</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Non-Fiction</option>
          <option value="reference">Reference</option>
          <option value="periodicals">News</option>
          <option value="textbooks">Text Books</option>
          <option value="education">Education</option>
          <option value="science">Science</option>
        </select>
      </div> */}
    </div>
  );
}

export default DigitalBookFilter;
