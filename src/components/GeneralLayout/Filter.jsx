function Filter() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
      <ul className="space-y-2">
        <li>
          <button className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            Fiction
          </button>
        </li>
        <li>
          <button className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            Non-Fiction
          </button>
        </li>
        {/* Add more categories as needed */}
      </ul>
    </div>
  );
}

export default Filter;
