
import React from 'react';

function Popup({ message, onClose }) {
  return (
<div
  id="popup-modal"
  tabIndex="-1"
  className="fixed inset-0 z-50 flex justify-center items-center bg-black/40"
>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 max-w-md  w-[80%]">
        <div className="text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
