import React, { useState } from "react";

const ModalWithBlur = ({ setIsModalOpen }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Modal Title</h2>
      <p className="text-gray-700 mb-6">
        This is a modal with a blurred background.
      </p>
      <button
        onClick={closeModal}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Close Modal
      </button>
    </div>
  );
};

export default ModalWithBlur;
