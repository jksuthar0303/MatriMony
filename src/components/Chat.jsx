import { useState } from "react";
import { FaComments } from "react-icons/fa";
const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 z-50 right-8">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col">
          <div className="bg-pink-600 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="text-lg font-semibold">Chat Support</h3>
            <button
              className="text-white text-xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-gray-700">
            <p>Welcome to chat support! How can we assist you today?</p>
          </div>
          <div className="p-4 border-t border-gray-300">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e24169]"
            />
          </div>
        </div>
      ) : (
        <button
          className="bg-pink-600 text-white rounded-full p-4 shadow-lg hover:bg-pink-500"
          onClick={() => setIsOpen(true)}
        >
          <FaComments className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Chat;
