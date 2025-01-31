"use client";

import Slider from "react-slick";
import {  useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const StoryCarousel = ({ stories }) => {

  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
    pauseOnHover: true ,
    slidesToShow: 4, 
    swipeToSlide: true, 
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280, // For large screens (lg)
        settings: {
          slidesToShow: 4, // Show 3 cards
          slidesToScroll: 1,
          centerMode: false, // Disable center mode to show all 3 cards
          centerPadding: "0", // Disable extra padding around the cards
        },
      },
      {
        breakpoint: 1024, // For medium screens (md)
        settings: {
          slidesToShow: 2, // Show 2 cards
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500, // For small screens
        settings: {
          slidesToShow: 1, // Show 1 card
          slidesToScroll: 1,
        },
      },
    ],
  };
// Custom slide navigation functions
const goToNextSlide = () => {
  if (sliderRef.current) {
    sliderRef.current.slickNext();
  }
};

const goToPrevSlide = () => {
  if (sliderRef.current) {
    sliderRef.current.slickPrev();
  }
};
  return (
    <div className="relative">
      <Slider {...settings} ref={sliderRef}>
        {stories.slice(0, 4).map((story, index) => (
          <div key={index} className="p-2 h-[400px]">
           
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col p-4 rounded-lg items-center bg-pink-600  bg-opacity-10 shadow-md"
            >
            <div className="flex flex-col h-[300px] items-center">
                <div className="w-32 h-32 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover rounded-full border-4 border-pink-500 group-hover:scale-105 transition-all"
                  />
                </div>
                <div className="text-center relative">
                  <p className="text-md lg:text-lg text-gray-700 mb-4">
                    {story.story}
                  </p>
                  <p className="font-bold text-pink-600 text-lg">
                    - {story.name}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                  🩷{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(story.date))}
                </p>
            </motion.div>

              
          </div>
        ))}
      </Slider>
         {/* Custom Arrows */}
         <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-2xl text-pink-600"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-2xl text-pink-600"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default StoryCarousel;
