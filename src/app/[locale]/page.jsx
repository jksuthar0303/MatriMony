"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const t = useTranslations();
  const scrollRef = useRef(null);

  useEffect(() => {
    // Replace with your backend API URL
    fetch('http://localhost:5000/api/get-profiles')
      .then((response) => response.json())
      .then((data) => setProfiles(data))
      .catch((error) => console.error('Error fetching profiles:', error));
  }, []);
  // Scroll left function
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll right function
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

        // If scrolled to the end, reset scroll to the beginning
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);



  return (
    <div className="p-4 space-y-12">
      {/* Hero Section */}
      <div
        className="relative w-full h-[600px] flex flex-col items-center justify-center text-center p-8 rounded-2xl shadow-lg overflow-hidden"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl font-extrabold text-white leading-tight">
            {t("HomePage.title")}
          </h1>

          <p className="mt-4 text-xl text-gray-200">
            {t("HomePage.description")}
          </p>
          <div className="mt-6 space-x-4">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all">
              {t("HomePage.getStarted")}
            </button>
            <button className="bg-white text-pink-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-200 transition-all">
              {t("HomePage.learnMore")}
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-10 text-white text-lg hidden md:block">
          <p>{t("HomePage.successfulMatches")}</p>
        </div>
        <div className="absolute top-10 right-10 bg-pink-600 text-white py-2 px-6 rounded-full hidden md:block">
          <span className="font-semibold">
            {t("HomePage.verifiedProfiles")}
          </span>
        </div>
      </div>

      {/* Search Filters Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
          {t("Filters.findYourPerfectMatch")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Looking For */}
          <select className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500 accent-pink-600">
            <option value="">{t("Filters.lookingFor")}</option>
            <option value="bride">{t("Options.gender.male")}</option>
            <option value="groom">{t("Options.gender.female")}</option>
          </select>

          {/* Min Age Dropdown */}
          <select className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500 accent-pink-600">
            <option value="">{t("Filters.minAge")}</option>
            {Array.from({ length: 18 }, (_, i) => (
              <option key={i + 18} value={i + 18}>
                {i + 18}
              </option>
            ))}
          </select>

          {/* Max Age Dropdown */}
          <select className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500 accent-pink-600">
            <option value="">{t("Filters.maxAge")}</option>
            {Array.from({ length: 18 }, (_, i) => (
              <option key={i + 18} value={i + 18}>
                {i + 18}
              </option>
            ))}
          </select>

          {/* Caste Dropdown */}
          <select className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500 accent-pink-600">
            <option value="">{t("Filters.selectCaste")}</option>
            <option value="">{t("Options.caste.suthar")}</option>
          </select>

          {/* Sub-Caste Dropdown */}
          <select className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500 accent-pink-600">
            <option value="">{t("Filters.selectSubCaste")}</option>
            <option value="">{t("Options.Sub-Caste.kulriya")}</option>
            <option value="">{t("Options.Sub-Caste.jhambad")}</option>
            <option value="">{t("Options.Sub-Caste.mandan")}</option>
            <option value="">{t("Options.Sub-Caste.makad")}</option>
            <option value="">{t("Options.Sub-Caste.nagal")}</option>
          </select>

          {/* Qualification Dropdown */}
          <select className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500 accent-pink-600">
            <option>{t("Filters.qualification")}</option>
            <option>{t("Options.qualification.bachelor")}</option>
            <option>{t("Options.qualification.master")}</option>
            <option>{t("Options.qualification.phd")}</option>
            <option>{t("Options.qualification.diploma")}</option>
          </select>

          {/* Occupation Dropdown */}
          <select className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500 accent-pink-600">
            <option>{t("Filters.occupation")}</option>
            <option>{t("Options.occupation.doctor")}</option>
            <option>{t("Options.occupation.engineer")}</option>
            <option>{t("Options.occupation.teacher")}</option>
            <option>{t("Options.occupation.business")}</option>
          </select>

          {/* State Dropdown */}
          <select className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500 accent-pink-600">
            <option>{t("Filters.state")}</option>
            <option>{t("Options.state.rajasthan")}</option>
          </select>

          {/* City Dropdown */}
          <select className="p-3 border rounded-lg w-full focus:ring-pink-500 focus:border-pink-500 accent-pink-600">
            <option>{t("Filters.city")}</option>
            <option>{t("Options.city.bikaner")}</option>
            <option>{t("Options.city.jaipur")}</option>
          </select>
        </div>

        {/* Additional Filters - Radio Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Manglik */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-600">
              {t("Filters.manglik")}:
            </span>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="manglik"
                value="Yes"
                className="accent-pink-600"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="manglik"
                value="No"
                className="accent-pink-600"
              />
              <span>No</span>
            </label>
          </div>

          {/* Divyang */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-600">
              {t("Filters.divyang")}:
            </span>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="divyang"
                value="Yes"
                className="accent-pink-600"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="divyang"
                value="No"
                className="accent-pink-600"
              />
              <span>No</span>
            </label>
          </div>

          {/* Second Marriage */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-600">
              {t("Filters.secondMarriage")}:
            </span>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="secondMarriage"
                value="Yes"
                className="accent-pink-600"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="secondMarriage"
                value="No"
                className="accent-pink-600"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-8 text-center">
          <button className="bg-pink-600 w-96 text-white py-3 px-8 rounded-lg hover:bg-pink-700 transition-all">
            {t("Filters.searchButton")}
          </button>
        </div>
      </div>

      {/* Featured Profiles Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg relative">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
        Featured Profiles
      </h2>

      {/* Scrollable Profiles Section */}
      <div className="relative overflow-hidden">
        <div
          className="flex space-x-6 overflow-x-scroll scroll-smooth scrollbar-hide"
          ref={scrollRef}
        >
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md min-w-[250px]"
            >
              <img
                src={profile.image}
                alt="Profile"
                className="w-32 h-32 mx-auto rounded-full"
              />
              <h3 className="text-xl font-bold text-center mt-4">
                {profile.name}
              </h3>
              <p className="text-center text-gray-600">
                Age: {profile.age} | {profile.occupation} | {profile.location}
              </p>
              <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-all">
                View Profile
              </button>
            </div>
          ))}
        </div>

        {/* Left and Right Scroll Buttons */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 transition-all"
          onClick={scrollLeft}
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 transition-all"
          onClick={scrollRight}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>

      {/* Success Stories Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
          Success Stories
        </h2>
        <div className="space-y-6">
          {/* Success Story 1 */}
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all">
            <div className="flex-shrink-0 w-32 h-32 mb-4 md:mb-0">
              <img
                src="https://images.pexels.com/photos/30311841/pexels-photo-30311841/free-photo-of-romantic-outdoor-wedding-photography-with-bouquet.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Ankit & Priya"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg text-gray-700 mb-3">
                "Thanks to MyLifepair, we found each other and tied the knot. It
                was a smooth experience, and we're grateful!"
              </p>
              <p className="font-bold text-gray-600 text-lg">- Ankit & Priya</p>
            </div>
          </div>

          {/* Success Story 2 */}
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all">
            <div className="flex-shrink-0 w-32 h-32 mb-4 md:mb-0">
              <img
                src="https://images.pexels.com/photos/30311847/pexels-photo-30311847/free-photo-of-joyful-couple-piggyback-in-spring-garden.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Rahul & Sneha"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg text-gray-700 mb-3">
                "A truly wonderful platform that helped us connect beyond
                boundaries. Highly recommended!"
              </p>
              <p className="font-bold text-gray-600 text-lg">- Rahul & Sneha</p>
            </div>
          </div>

          {/* Success Story 3 */}
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all">
            <div className="flex-shrink-0 w-32 h-32 mb-4 md:mb-0">
              <img
                src="https://images.pexels.com/photos/30358216/pexels-photo-30358216/free-photo-of-romantic-wedding-embrace-in-san-felipe-mexico.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Vishal & Neha"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg text-gray-700 mb-3">
                "MyLifepair made the journey of finding my life partner so much
                easier. It’s a life-changing experience!"
              </p>
              <p className="font-bold text-gray-600 text-lg">- Vishal & Neha</p>
            </div>
          </div>
        </div>

        {/* Show More Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => (window.location.href = "/success-stories")}
            className="px-6 py-2 w-56 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-all"
          >
            Show More
          </button>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-pink-600 text-white text-center p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Find Your Match?
        </h2>
        <p className="text-lg mb-6">Join now and start your journey with us!</p>
        <button className="bg-white text-pink-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-200">
          Register Now
        </button>
      </div>
    </div>
  );
}
