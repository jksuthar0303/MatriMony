"use client";

import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing FontAwesome icons for arrows

// Custom Left and Right Arrow Components
const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-600 text-white p-3 rounded-full cursor-pointer z-10`}
      onClick={onClick}
    >
      <FaChevronLeft size={20} color="#D6366B" />
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-600 text-white p-3 rounded-full cursor-pointer z-10`}
      onClick={onClick}
    >
      <FaChevronRight size={20} color="#D6366B" />
    </div>
  );
};

const StoryCarousel = ({ stories }) => {
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,  // Enable autoplay
        autoplaySpeed: 3000,  // Change slides every 3 seconds
        slidesToShow: 3,  // Default for small screens
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1280, // For large screens (lg)
            settings: {
              slidesToShow: 3,  // Show 3 cards
              slidesToScroll: 1,
              centerMode: false, // Disable center mode to show all 3 cards
              centerPadding: '0',  // Disable extra padding around the cards
            },
          },
          {
            breakpoint: 1024, // For medium screens (md)
            settings: {
              slidesToShow: 2,  // Show 2 cards
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768, // For small screens
            settings: {
              slidesToShow: 1,  // Show 1 card
              slidesToScroll: 1,
            },
          },
        ],
      };
      
  
    return (
        <div className="relative">
        <Slider {...settings}>
          {stories.slice(0, 4).map((story, index) => (
            <div
              key={index}
              className="flex mt-4 mb-6  duration-300 h-[350px]"
            >
              <div className="h-full p-2 flex justify-center space-x-4 w-full">
                <div className="flex flex-col p-4 rounded-lg items-center bg-pink-600 bg-opacity-10 shadow-lg">
                  <div className="w-32 h-32 mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover rounded-full border-4 border-pink-500 group-hover:scale-105 transition-all"
                    />
                  </div>
                  <div className="text-center relative">
                    <p className="text-md lg:text-lg text-gray-700 mb-4">{story.story}</p>
                    <p className="font-bold text-pink-600 text-lg">- {story.name}</p>
                  </div>
                  <p className="text-gray-500 text-sm">
                🩷{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(story.date))}
              </p>
                </div>
               
              </div>
             
            </div>
          ))}
        </Slider>
      </div>
      
    );
  };
  

export default StoryCarousel;
