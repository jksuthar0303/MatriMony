import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaShare,
  FaComment,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { useRef, useState,useEffect } from "react";

const ProfileCarousel = ({
}) => {
 const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedProfiles, setLikedProfiles] = useState({});
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
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 658,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
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
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();

        if (!data || data.length === 0) {
          throw new Error("No data received");
        }

        if (data.message === "No token found") {
          setProfiles(data);
        } else {
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

   const handleWishlistClick = async (wishlistUserId) => {
     try {
       const response = await fetch("/api/wishlists", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         credentials: "include", 
         body: JSON.stringify({ wishlistUserId }),
       });
 
       const data = await response.json();
       if (!response.ok) throw new Error(data.message);
 
       alert(data.message);
     } catch (error) {
       alert(error.message || "Failed to update wishlist");
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
    <div className="relative"
    onTouchStart={handleTouchStart} 
    onTouchEnd={handleTouchEnd}>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : (
        <Slider {...settings} ref={sliderRef}>
          {profiles.map((profile) => (
            <div  className="p-2 h-[400px]">
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{ duration: 0.3 }}
              key={profile.id}
              className="bg-white p-6 rounded-xl shadow-lg w-full relative flex flex-col items-center text-center border border-gray-200"
            >
              <img
                src={profile.profilePic}
                alt="Profile"
                className="w-28 h-28 object-cover rounded-lg border-2 border-pink-500 shadow-lg"
              />
              <h3 className="text-lg font-semibold text-pink-600 mt-3 truncate">
                {profile.fullName}
              </h3>
              <div className="flex items-center justify-center gap-5 cursor-pointer mt-2">
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
            </motion.div>
            </div>
           
          ))}
        </Slider>
      )}
      <button
        onClick={goToPrevSlide}
        className="absolute  top-44 left-4 transform -translate-y-1/2 text-2xl text-pink-600"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-44 right-4 transform -translate-y-1/2 text-2xl text-pink-600"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProfileCarousel;
