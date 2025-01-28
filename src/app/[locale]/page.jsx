"use client";

import Slider from "react-slick";
import Dropdown from "@/components/Dropdown";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { options } from "@/option/dropDownOptions";
import DropdownWithCheck from "@/components/DropdownWithCheck";

export default function Home() {
  const [lookingFor, setLookingFor] = useState("bride");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [minAge, setMinAge] = useState("18");
  const [maxAge, setMaxAge] = useState("30");
  const [caste, setCaste] = useState("suthar");
  const [subCaste, setSubCaste] = useState(["kularia"]);
  const [qualification, setQualification] = useState(["none"]);
  const [occupation, setOccupation] = useState(["labour"]);
  const [state, setState] = useState(["rajasthan"]);
  const [city, setCity] = useState(["bikaner"]);
  const [manglik, setManglik] = useState("No");
  const [divyang, setDivyang] = useState("No");
  const [secondMarriage, setSecondMarriage] = useState("No");
  const [profiles, setProfiles] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProfiles, setLikedProfiles] = useState({});
  const t = useTranslations();
  const router = useRouter();

  const {
    cities,
    gender,
    minAgeOptions,
    maxAgeOptions,
    casteOptions,
    subCasteOptions,
    qualificationOptions,
    occupationOptions,
    stateOptions,
  } = options(t);

  const settings = {
    infinite: true, // Infinite scrolling
    speed: 500, // Animation speed
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    autoplay: true, // Auto-scroll images
    autoplaySpeed: 3000, // Time between scrolls (in ms)
  };

  const handleWishlistClick = async (wishlistUserId) => {
    try {
      // Use fetch with credentials to send the auth token
      const response = await fetch("/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are sent
        body: JSON.stringify({ wishlistUserId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert(data.message);
    } catch (error) {
      alert(error.message || "Failed to update wishlist");
    }
  };

  const handleClick = () => {
    router.push("/success-stories");
  };
  const handleSubCasteChange = (selectedValues) => {
    // Assuming logged-in user subCaste and motherSubcaste are available as variables
    const loggedInUserSubCaste = "kularia"; // Replace with actual logged-in user subCaste value
    const loggedInUserMotherSubCaste = "motiyar"; // Replace with actual logged-in user mother's subCaste value
  
    if (selectedValues.includes("all")) {
      // Get all values except the logged-in user's subCaste and mother's subCaste
      const allValues = subCasteOptions
        .map(option => option.value)
        .filter(value => value !== loggedInUserSubCaste && value !== loggedInUserMotherSubCaste);
      
      // Log the excluded values
      console.log("Excluded values:", [loggedInUserSubCaste, loggedInUserMotherSubCaste]);
  
      // Update the state with the filtered values
      setSubCaste(allValues);
      console.log("Selected values after excluding:", allValues); // Log all selected values excluding logged-in user's subCaste and motherSubcaste
    } else {
      // Set selected values normally
      setSubCaste(selectedValues);
      console.log("Selected values:", selectedValues); // Log selected values when individual options are selected
    }
  };
  
  
  
  const displaySubCaste = subCaste.includes("all") ? ["all"] : subCaste;
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/users/login");
      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies are sent
        });

        // Check if the response is okay (status 200-299)
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();

        // Check if the response body is empty
        if (!data || data.length === 0) {
          throw new Error("No data received");
        }

        // If the response data contains an error indicating no token or user is not authenticated
        if (data.message === "No token found") {
          // Handle case for no token - show all users
          setProfiles(data.users); // Assuming data.users contains the list of all users
        } else {
          // Handle case for logged-in users (wishlist filtering)
          setProfiles(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchStories() {
      const res = await fetch("/api/success-stories");
      const data = await res.json();
      setStories(data);
      setLoading(false);
    }
    fetchStories();
  }, []);

  return (
    <div className="p-4 space-y-12">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] flex flex-col items-center justify-center text-center p-8 rounded-2xl shadow-lg overflow-hidden">
        {/* Scrollable Image Container */}
        {/* Image Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          <Slider {...settings}>
            <div>
              <img
                src="/images/weeding1.jpg"
                alt="Slide 1"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div>
              <img
                src="/images/weeding2.jpg"
                alt="Slide 2"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div>
              <img
                src="/images/weeding3.jpg"
                alt="Slide 3"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div>
              <img
                src="/images/weeding4.jpg"
                alt="Slide 4"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </Slider>
        </div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl">
          {!isAuthenticated ? (
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                {t("HomePage.title")}
              </h1>
              <p className="mt-4 text-xl text-gray-200">
                {t("HomePage.description")}
              </p>
            </div>
          ) : (
            <div className="flex-col items-center justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                {t("HomePage.welcome")}
              </h1>
              <span className="text-4xl md:text-4xl ml-2 mt-3 lg:text-6xl font-extrabold text-pink-600 font-playwrite">
                {t("HomePage.domain")}
              </span>
              <div className="mt-6 bg-white bg-opacity-20 p-6 rounded-lg shadow-md">
            <p className="text-xl text-center text-gray-100 font-medium">
              {t("HomePage.description1")}
            </p>
          </div>
            </div>
          )}

          
          

          {!isAuthenticated ? (
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/register">
                <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all">
                  {t("HomePage.buttons.getStarted")}
                </button>
              </Link>
              <Link href="/learn-more">
                <button className="bg-white text-pink-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-200 transition-all">
                  {t("HomePage.buttons.learnMore")}
                </button>
              </Link>
            </div>
          ) : null}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 hidden bg-pink-600 text-white py-2 px-6 rounded-full md:block z-10">
          <span className="font-semibold">
            {t("HomePage.highlights.verifiedProfiles")}
          </span>
        </div>
      </div>

      {/* Search Filters Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-pink-600">
          {t("Filters.title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Looking For */}
          <div>
            <Dropdown
              options={gender}
              selectedValue={lookingFor}
              onChange={setLookingFor}
              label={t("Filters.fields.lookingFor")}
            />
          </div>
          <div className="col-span-2">
            <div className="flex items-center space-x-6">
              <Dropdown
                options={minAgeOptions}
                selectedValue={minAge}
                onChange={setMinAge}
                label={t("Filters.fields.minAge")}
              />
              <Dropdown
                options={maxAgeOptions}
                selectedValue={maxAge}
                onChange={setMaxAge}
                label={t("Filters.fields.maxAge")}
              />
            </div>
          </div>

          <div>
            <Dropdown
              options={casteOptions}
              selectedValue={caste}
              onChange={setCaste}
              label={t("Filters.fields.caste.selectCaste")}
            />
          </div>
          <div>
          <DropdownWithCheck
      options={subCasteOptions}
      selectedValues={displaySubCaste}
      onChange={handleSubCasteChange}
      label={t("Filters.fields.caste.selectSubCaste")}
    />

          </div>
          <div>
            <DropdownWithCheck
              options={qualificationOptions}
              selectedValues={qualification}
              onChange={setQualification}
              label={t("Filters.fields.qualification")}
            />
          </div>

          <div>
            <DropdownWithCheck
              options={occupationOptions}
              selectedValues={occupation}
              onChange={setOccupation}
              label={t("Filters.fields.occupation")}
            />
          </div>
          <div>
            <DropdownWithCheck
              options={stateOptions}
              selectedValues={state}
              onChange={setState}
              label={t("Filters.fields.location.state")}
            />
          </div>
          <div>
            <DropdownWithCheck
              options={cities}
              selectedValues={city}
              onChange={setCity}
              label={t("Filters.fields.location.city")}
            />
          </div>
        </div>

        {/* Additional Filters - Radio Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Manglik */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-pink-600">
              {t("Filters.fields.preferences.manglik")}:
            </span>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="manglik"
                value="Yes"
                className="accent-pink-600"
                checked={manglik === "Yes"}
                onChange={() => setManglik("Yes")}
              />
              <span>{t("Options.preferences.manglik.yes")}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="manglik"
                value="No"
                className="accent-pink-600"
                checked={manglik === "No"}
                onChange={() => setManglik("No")}
              />
              <span>{t("Options.preferences.manglik.no")}</span>
            </label>
          </div>

          {/* Divyang */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-pink-600">
              {t("Filters.fields.preferences.divyang")}:
            </span>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="divyang"
                value="Yes"
                className="accent-pink-600"
                checked={divyang === "Yes"}
                onChange={() => setDivyang("Yes")}
              />
              <span>{t("Options.preferences.divyang.yes")}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="divyang"
                value="No"
                className="accent-pink-600"
                checked={divyang === "No"}
                onChange={() => setDivyang("No")}
              />
              <span>{t("Options.preferences.divyang.no")}</span>
            </label>
          </div>

          {/* Second Marriage */}
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-pink-600">
              {t("Filters.fields.preferences.secondMarriage")}:
            </span>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="secondMarriage"
                value="Yes"
                className="accent-pink-600"
                checked={secondMarriage === "Yes"}
                onChange={() => setSecondMarriage("Yes")}
              />
              <span>{t("Options.preferences.secondMarriage.yes")}</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="secondMarriage"
                value="No"
                className="accent-pink-600"
                checked={secondMarriage === "No"}
                onChange={() => setSecondMarriage("No")}
              />
              <span>{t("Options.preferences.secondMarriage.no")}</span>
            </label>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={handleClick}
            className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-500 w-56 transition-all"
          >
            {t("Filters.actions.searchButton")}
          </button>
        </div>
      </div>

      {/* Featured Profiles Section */}

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 md:mb-6 text-pink-600">
          {t("Profiles.title")}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.slice(0, 4).map((profile, index) => (
              <div
                key={profile.id} // Make sure profile has a unique 'id'
                className="bg-white h-[450px] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                {/* Profile Picture */}
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-full h-64 object-cover rounded-md mb-4"
                />

                {/* Profile Name and Like Button */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-pink-600 truncate">
                    {profile.fullName}
                  </h3>
                  <div
                    className="cursor-pointer flex items-center gap-2"
                    title={
                      likedProfiles[profile._id]
                        ? "Remove from likes"
                        : "Add to likes"
                    }
                  >
                    {likedProfiles[profile._id] ? (
                      <FaHeart color="red" size={20} />
                    ) : (
                      <FaRegHeart color="red" size={20} />
                    )}
                    {/* Likes Count */}
                    <span className="text-gray-600 text-sm">
                      {profile.likesCount || 100}
                    </span>
                  </div>
                </div>

                {/* Profile Details */}

                <div className="flex  justify-center gap-4 text-gray-600 items-center">
                  <div className="flex flex-col items-center">
                    <span className="font-medium">Age</span>
                    <p className="text-sm">{profile.age}</p>
                  </div>
                  |
                  <div className="flex flex-col items-center">
                    <span className="font-medium">Occupation</span>
                    <p className="text-sm uppercase">{profile.occupation}</p>
                  </div>
                  |
                  <div className="flex flex-col items-center">
                    <span className="font-medium">City</span>
                    <p className="text-sm  uppercase"> {profile.city}</p>
                  </div>
                </div>

                {/*  Buttons */}
                <div className="flex gap-4">
                  <button className="w-full mt-4  bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-all">
                    View Profile
                  </button>
                  <button
                    onClick={() => handleWishlistClick(profile._id)}
                    className="w-full mt-4 border-2 border-pink-600 text-pink-600 py-2 rounded-lg transition-all"
                  >
                    You Like
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Success Stories Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-pink-600">
          {t("SuccessStories.title")}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.slice(0, 4).map((story, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover rounded-full border-4 border-pink-500 group-hover:scale-105 transition-all"
                    />
                  </div>
                  <div className="text-center relative">
                    <p className="text-lg text-gray-700 mb-4">{story.story}</p>
                    <p className="font-bold text-gray-600 text-lg">
                      - {story.name}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-start text-gray-500 text-sm">
                  🩷{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(story.date))}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleClick}
            className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-500 w-56 transition-all"
          >
            {t("SuccessStories.showMore")}
          </button>
        </div>
      </div>

      {/* Call-to-Action Section */}
      {!isAuthenticated ? (
        <div className="bg-pink-600 text-white text-center p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">
            {t("HomePage.callToAction.readyToFindMatch")}
          </h2>
          <p className="text-lg mb-6"> {t("HomePage.callToAction.joinNow")}</p>
          <button className="bg-white text-pink-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-200">
            {t("HomePage.buttons.registerNow")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
