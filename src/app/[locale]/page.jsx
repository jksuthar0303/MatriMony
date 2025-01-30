"use client";

import Slider from "react-slick";
import Dropdown from "@/components/Dropdown";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaComment, FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { options } from "@/option/dropDownOptions";
import DropdownWithCheck from "@/components/DropdownWithCheck";
import StoryCarousel from "@/components/StoryCarausel";

export default function Home() {
  const t = useTranslations();
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

  const [lookingFor, setLookingFor] = useState("bride");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [minAge, setMinAge] = useState("18");
  const [maxAge, setMaxAge] = useState("30");
  const [caste, setCaste] = useState("suthar");
  const [user, setUser] = useState("");
  const [subCaste, setSubCaste] = useState([]);
  const [qualification, setQualification] = useState(
    qualificationOptions.map((qualification) => qualification.value)
  );
  const [occupation, setOccupation] = useState(
    occupationOptions.map((occupation) => occupation.value)
  );
  const [state, setState] = useState(["rajasthan"]);
  const [city, setCity] = useState(cities.map((city) => city.value));
  const [manglik, setManglik] = useState("No");
  const [divyang, setDivyang] = useState("No");
  const [secondMarriage, setSecondMarriage] = useState("No");
  const [profiles, setProfiles] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProfiles, setLikedProfiles] = useState({});
  const router = useRouter();

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
  const handleChange = (setter, updatedValues) => {
    setter(updatedValues); // Update the state for the corresponding filter
  };

  useEffect(() => {
    const getLoggedUserDetails = async () => {
      try {
        const request = new Request("/api/users/login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await fetch(request);
        const data = await res.json();

        if (data.isAuthenticated) {
          setIsAuthenticated(true);

          setUser(data.user);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    getLoggedUserDetails();
  }, []);

  const loggedInUserSubCaste = user.subCaste;
  const loggedInUserMotherSubCaste = user.motherSubCaste;

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
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] flex flex-col items-center justify-center text-center p-8 rounded-2xl shadow-lg overflow-hidden">
        {/* Image Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          <Slider {...settings}>
            <div>
              <img
                src="/images/weeding1.jpg"
                alt="Slide 1"
                className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
              />
            </div>
            <div>
              <img
                src="/images/weeding2.jpg"
                alt="Slide 2"
                className="w-full h-[300px] md:h-[500px] lg:h-[600px]  object-cover"
              />
            </div>
            <div>
              <img
                src="/images/weeding3.jpg"
                alt="Slide 3"
                className="w-full h-[300px] md:h-[500px] lg:h-[600px]  object-cover"
              />
            </div>
            <div>
              <img
                src="/images/weeding4.jpg"
                alt="Slide 4"
                className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
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
            <div className="flex items-center justify-center">
              <span className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                {t("HomePage.welcome")}
                <span className="ml-4 font-extrabold text-pink-600 font-playwrite">
                  {user.fullName}
                </span>
              </span>
            </div>
          )}

          {!isAuthenticated ? (
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/register">
                <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold p-4 text-sm rounded-lg shadow-lg transition-all">
                  {t("HomePage.buttons.getStarted")}
                </button>
              </Link>
              <Link href="/learn-more">
                <button className="bg-white text-pink-600 font-bold py-3 p-4 rounded-lg shadow-lg hover:bg-gray-200 transition-all">
                  {t("HomePage.buttons.learnMore")}
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>

  
        <div className="flex flex-col justify-center text-center items-center space-y-3 text-md md:text-lg lg:text-xl font-semibold text-pink-600">
          <p >
            {t("HomePage.description1")}
          </p>
          <p>
            {t("HomePage.description2")}
          </p>
          <p>
            {t("HomePage.description3")}
          </p>
          <p>
            {t("HomePage.description4")}
          </p>
        </div>

      {/* Search Filters Section */}
      <div className="bg-white p-8">
        <h2 className="text-2xl text-center md:text-3xl lg:text-3xl font-semibold  mb-2 text-pink-600">
          {t("Filters.title")}
        </h2>
        <hr className="border-pink-600 border-t-2 w-56 mx-auto mb-6" />

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
              selectedValues={subCaste}
              onChange={(updatedValues) =>
                handleChange(setSubCaste, updatedValues)
              }
              loggedInUserSubCaste={loggedInUserSubCaste}
              loggedInUserMotherSubCaste={loggedInUserMotherSubCaste}
              label={t("Filters.fields.caste.selectSubCaste")}
            />
          </div>
          <div>
            <DropdownWithCheck
              options={qualificationOptions}
              selectedValues={qualification}
              onChange={(updatedValues) =>
                handleChange(setQualification, updatedValues)
              }
              label={t("Filters.fields.qualification")}
            />
          </div>

          <div>
            <DropdownWithCheck
              label="Select Occupation"
              options={occupationOptions}
              selectedValues={occupation} // Use the occupation state here
              onChange={(updatedValues) =>
                handleChange(setOccupation, updatedValues)
              }
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
              onChange={(updatedValues) => handleChange(setCity, updatedValues)}
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
      <div className="bg-white p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-pink-600">
          {t("Profiles.title")}
        </h2>
        <hr className="border-pink-600 border-t-2 w-56 mx-auto mb-6" />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {profiles.slice(0, 4).map((profile) => (
              <div
                key={profile.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all w-full relative flex flex-col items-center text-center border border-gray-200"
              >
                {/* Profile Image */}
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-28 h-28 object-cover rounded-full border-4 border-pink-500 shadow-lg"
                />

                {/* Name & Like Button */}
                <h3 className="text-lg font-semibold text-pink-600 mt-3 truncate">
                  {profile.fullName}
                </h3>

                <div
                  className="flex items-center justify-center gap-5 cursor-pointer mt-2"
                  title={
                    likedProfiles[profile._id]
                      ? "Remove from likes"
                      : "Add to likes"
                  }
                >
                  <div className="flex items-center gap-1">
                    {likedProfiles[profile._id] ? (
                      <FaHeart color="#CB3A80" size={18} />
                    ) : (
                      <FaRegHeart color="#CB3A80" size={18} />
                    )}
                    <span className="text-gray-600 text-sm">
                      {profile.likesCount || 100}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaShare color="#CB3A80" />
                    <span className="text-gray-600 text-sm">25</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaComment color="#CB3A80" />
                    <span className="text-gray-600 text-sm">35</span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex justify-center text-gray-600 items-center my-4 gap-6">
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-sm">Age</span>
                    <p className="text-xs">{profile.age}</p>
                  </div>
                  |
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-sm">Job</span>
                    <p className="text-xs uppercase">{profile.occupation}</p>
                  </div>
                  |
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-sm">City</span>
                    <p className="text-xs uppercase">{profile.city}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 w-full">
                  <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-all text-sm">
                    View Profile
                  </button>
                  <button
                    onClick={() => handleWishlistClick(profile._id)}
                    className="w-full border-2 border-pink-600 text-pink-600 py-2 rounded-lg hover:bg-pink-600 hover:text-white transition-all text-sm"
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Success Stories Section */}
      <div className="mx-4">
        <h2 className="text-3xl font-semibold text-center mb-4 text-pink-600">
          {t("SuccessStories.title")}
        </h2>
        <hr className="border-pink-600 border-t-2 w-28 mx-auto mb-6" />
        <StoryCarousel stories={stories} />
      </div>

      {/* Call-to-Action Section */}
      {!isAuthenticated ? (
        <div className="bg-pink-600 text-white text-center p-8 rounded-lg">
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
