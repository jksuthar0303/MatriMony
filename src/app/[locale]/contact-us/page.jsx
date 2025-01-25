"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const t = useTranslations("ContactUs");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-pink-600 text-center mb-8">
        {t("contactUs")}
      </h1>
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
        {t("contactDescription")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-pink-600 mb-6"> {t("sendMessage")}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t("yourName")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-500 focus:ring-pink-500 outline-none"
                placeholder={t("enterYourName")}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t("yourEmail")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-500 focus:ring-pink-500 outline-none"
                placeholder={t("enterYourEmail")}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t("yourPhone")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-500 focus:ring-pink-500 outline-none"
                placeholder={t("enterYourPhone")}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t("yourMessage")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:border-pink-500 focus:ring-pink-500 outline-none"
                placeholder={t("writeYourMessage")}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-500 transition-all"
            >
              {t("sendMessageButton")}
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-pink-600 mb-6">{t("contactInformation")}</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-pink-600 text-2xl" />
              <div>
                <p className="text-gray-700 font-medium">{t("phone")}</p>
                <p className="text-gray-500">+1 234 567 890</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-pink-600 text-2xl" />
              <div>
                <p className="text-gray-700 font-medium">{t("email")}</p>
                <p className="text-gray-500">support@mylifepair.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-pink-600 text-2xl" />
              <div>
                <p className="text-gray-700 font-medium">{t("address")}</p>
                <p className="text-gray-500">123 Love Street, Romance City, 56789</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <iframe
              className="w-full rounded-lg shadow-lg"
              height="250"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093743!2d144.95592521531258!3d-37.81720974202162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5dfc9fbf0b%3A0x1a7bc4b85b2b735d!2sLove%20Street!5e0!3m2!1sen!2sus!4v1635410852555!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
