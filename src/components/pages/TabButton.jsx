function TabButton({ tab, handler, activeTab, buttonText }) {
  return (
    <button
      onClick={() => handler(tab)}
      className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${
        activeTab === tab
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
          : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
      }`}
    >
      {buttonText}
    </button>
  );
}

export default TabButton;
