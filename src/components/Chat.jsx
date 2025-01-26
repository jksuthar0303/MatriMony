"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaComments } from "react-icons/fa";
const Chat = () => {
  const t = useTranslations("ChatBox")
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 z-50 right-8">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col">
          <div className="bg-pink-600 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="text-lg font-semibold">{t("title")}</h3>
            <button
              className="text-white text-xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-gray-700">
            <p>{t("messages.welcomeMessage")}</p>
          </div>
          <div className="p-4 border-t border-gray-300">
            <input
              type="text"
              placeholder={t("messages.typeYourMessage")}
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
