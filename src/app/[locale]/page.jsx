"use client";

import Slider from "react-slick";
import { Link, useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import StoryCarousel from "@/components/StoryCarausel";
import Compliments from "@/components/Compliments";
import ProfileCarousel from "@/components/ProfilesCarousel";
import Filters from "@/components/Filters";
import { useTranslations } from "next-intl";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const router = useRouter();
  const t = useTranslations();
  const settings = {
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
  };

  const handleClick = () => {
    router.push("/success-stories");
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

 

  return (
    <div className="p-2 space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center mt-6 p-6">
  <div className="max-w-3xl">
    {/* Title & Description */}
    {!isAuthenticated ? (
      <div className="animate-fadeIn">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-pink-600">
          {t("HomePage.title")}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          {t("HomePage.description")}
        </p>
      </div>
    ) : (
      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center animate-fadeIn">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-600-800">
          {t("HomePage.welcome")}
           
        </h1>
        <span className="font-extrabold md:ml-4 text-4xl md:text-5xl lg:text-6xl text-pink-600 font-playwrite">
              {user.fullName}
            </span>
      </div>
    )}

    {/* Buttons */}
    {!isAuthenticated && (
      <div className="mt-6 flex sm:flex-col md:flex-row justify-center items-center gap-4 animate-fadeIn delay-300">
        <Link href="/register">
          <button className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-bold py-4 px-8 text-lg rounded-full w-56 shadow-lg transition-all duration-300 transform hover:scale-105">
            {t("HomePage.buttons.getStarted")}
          </button>
        </Link>
        <Link href="/learn-more">
          <button className="border border-pink-500 text-pink-600 font-bold py-3 px-8 text-lg rounded-full shadow-md bg-white hover:bg-pink-50 transition-all duration-300 w-56 transform hover:scale-105">
            {t("HomePage.buttons.learnMore")}
          </button>
        </Link>
      </div>
    )}

    {/* Down Arrow Button with Scroll to 400px */}
    <div className="mt-8 justify-center items-center flex">
      <button
      onClick={() => {
    // Get the current screen width
    const screenWidth = window.innerWidth;

    // Determine the scroll distance based on the screen width
    let scrollDistance = 1500; // Default scroll distance

    if (screenWidth <= 640) {
      // For small devices (sm), adjust scroll distance (for example, 1800px)
      scrollDistance = 1800;
    } else if (screenWidth <= 768) {
      // For medium devices (md), adjust scroll distance (for example, 1500px)
      scrollDistance = 1500;
    } else if (screenWidth > 768) {
      // For larger devices, keep the default scroll distance (1500px)
      scrollDistance = 1400;
    }

    // Perform the scroll based on the calculated distance
    window.scrollBy({ top: scrollDistance, behavior: "smooth" });
  }}
        className="flex justify-center items-center animate-bounce"
      >
        <svg
          className="w-10 h-10 text-pink-600 hover:text-pink-700 transition-all duration-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12l7 7 7-7"
          />
        </svg>
      </button>
    </div>
  </div>
</div>



      <div className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] flex flex-col items-center justify-center text-center p-8 rounded-2xl shadow-lg overflow-hidden">
        {/* Image Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          <Slider {...settings}>
            {["weeding1", "weeding2", "weeding3", "weeding4"].map(
              (img, index) => (
                <div key={index}>
                  <img
                    src={`/images/${img}.jpg`}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[350px] md:h-[500px] lg:h-[600px] object-cover transition-all duration-700"
                  />
                </div>
              )
            )}
          </Slider>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
      </div>

      {/* Search Filters Section */}
      <div className="bg-white p-8">
        <h2 className="text-2xl text-center md:text-3xl lg:text-3xl font-semibold  mb-2 text-pink-600">
          {t("Filters.title")}
        </h2>
        <hr className="border-pink-600 border-t-2 w-40 mx-auto mb-6" />

        <Filters
          loggedInUserMotherSubCaste={loggedInUserMotherSubCaste}
          loggedInUserSubCaste={loggedInUserSubCaste}
        />
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
      <div className="bg-white">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-pink-600">
          {t("Profiles.title")}
        </h2>
        <hr className="border-pink-600 border-t-2 w-28 md:w-36 lg:w-40 mx-auto mb-6" />

        <ProfileCarousel />
      </div>

      {/* Compliments Section */}
      <div className="mx-2">
        <div className="bg-gray-100 py-12">
          <div className="mx-auto text-center">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">
              {t("compliments.title")}
            </h2>
            <hr className="border-pink-600 border-t-2 w-36 mx-auto mb-6" />

            <Compliments />

            <div className="mt-4 flex flex-col items-center">
              <h3 className="text-2xl text-pink-600">
                {" "}
                {t("compliments.feedback")}
              </h3>
              <p className="mt-2 text-gray-600 break-words whitespace-normal text-center max-w-[250px] md:max-w-[400px] lg:max-w-[400px]">
                {t("compliments.discription")}
              </p>
              <a
                href="/contact"
                className="mt-4 inline-block text-white bg-pink-600 px-6 py-3 rounded-full hover:bg-pink-700 transition-all"
              >
                {t("compliments.button")}
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Success Stories Section */}
      <div className="mx-2">
        <h2 className="text-3xl font-semibold text-center mb-4 text-pink-600">
          {t("SuccessStories.title")}
        </h2>
        <hr className="border-pink-600 border-t-2 w-36 mx-auto mb-6" />
        <StoryCarousel  />
        <div className="flex justify-center mt-2 mb-6">
          <Link href="/success-stories">
            <button className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-all w-56 text-md">
              {t("HomePage.buttons.showmore")}
            </button>
          </Link>
        </div>
      </div>

      {/* Call-to-Action Section */}
      {!isAuthenticated ? (
        <div className="bg-pink-600 text-white text-center p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">
            {t("HomePage.callToAction.readyToFindMatch")}
          </h2>
          <p className="text-lg mb-6"> {t("HomePage.callToAction.joinNow")}</p>
          <Link href="/register">
            <button className="bg-white text-pink-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-200">
              {t("HomePage.buttons.registerNow")}
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
