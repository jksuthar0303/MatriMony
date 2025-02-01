"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Slider from "react-slick";
import {
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Compliments() {
  const [feedback] = useState([
    {
      name: "Aditi Sharma",
      location: "Delhi, India",
      text: "A fantastic platform! The user interface is very easy to use, and I found the perfect match for myself within weeks. Highly recommend it!",
      rating: 5, // Rating out of 5
    },
    {
      name: "Sandeep Verma",
      location: "Chennai, India",
      text: "I had a great experience. The profiles are genuine, and I could communicate with potential matches with ease. Worth the investment.",
      rating: 4, // Rating out of 5
    },
    {
      name: "Neha Kapoor",
      location: "Mumbai, India",
      text: "I was skeptical at first, but after signing up, I was pleasantly surprised by the quality of matches and the smooth interaction. Great job!",
      rating: 5, // Rating out of 5
    },
    {
      name: "Rajeev Kumar",
      location: "Bangalore, India",
      text: "This site is an excellent resource for finding genuine profiles. The customer support is outstanding and always ready to help. A must-try platform.",
      rating: 4, // Rating out of 5
    },
  ]);
  const [isTouching, setIsTouching] = useState(false);
  const touchTimer = useRef(null);
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: !isTouching,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnHover: true,
    arrows: false, // Disable default arrows
    responsive: [
      {
        breakpoint: 1280, // For large screens (lg)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1024, // For medium screens (md)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 658, // For small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
    }
    return stars;
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

  const handleTouchStart = () => {
    touchTimer.current = setTimeout(() => {
      setIsTouching(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimer.current);
    setIsTouching(false);
  };

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Slider {...settings} ref={sliderRef}>
        {feedback.map((item, index) => (
          <div key={index} className="p-2 h-[300px]">
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-md h-[250px] flex flex-col justify-center items-center p-4 rounded-lg"
            >
              <p className="text-lg font-semibold text-pink-600">{item.name}</p>
              <p className="text-sm text-gray-500">{item.location}</p>
              <div className="flex justify-center mt-2">
                {renderStars(item.rating)}
              </div>
              <p className="mt-4 text-gray-700 italic text-center">
                "{item.text}"
              </p>
            </motion.div>
          </div>
        ))}
      </Slider>

      {/* Custom Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute  top-32 left-4 transform -translate-y-1/2 text-2xl text-pink-600"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-32 right-4 transform -translate-y-1/2 text-2xl text-pink-600"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
