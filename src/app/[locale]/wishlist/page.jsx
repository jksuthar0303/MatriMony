"use client";

import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedInWishlist, setAddedInWishlist] = useState({});
  const [likedProfiles, setLikedProfiles] = useState({});

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/wishlists", {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch wishlist");
        }

        const data = await response.json();

        if (data.message) {
          setError(data.message);
          return;
        }

        setWishlist(data.wishlist || []);
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (wishlistUserId) => {
    try {
      const response = await fetch("/api/wishlists", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ wishlistUserId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.profileId !== wishlistUserId)
      );

      alert(data.message);
    } catch (error) {
      alert(error.message || "Failed to remove from wishlist");
    }
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-4xl font-bold text-pink-600 text-center mb-6">
        Your Wishlist
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <p className="text-center text-xl font-bold text-gray-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.length > 0
            ? wishlist.map((profile) => (
                <div
                  key={profile.profileId}
                  className="bg-white h-[480px] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-100"
                >
                  <img
                    src={profile.profilePic}
                    alt={profile.name}
                    className="w-full h-72 object-cover rounded-md"
                  />
                  <div className="mt-4 text-center">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg md:text-xl font-bold text-center text-pink-600">
                        {profile.fullName}
                      </h2>
                      <span className=" text-green-600 font-bold">Both Like It</span>
                      <div className="cursor-pointer flex items-center gap-2">
                        {likedProfiles[profile._id] ? (
                          <FaHeart color="red" size={20} />
                        ) : (
                          <FaRegHeart color="red" size={20} />
                        )}
                        {/* Likes Count */}
                        <span className="text-gray-600 text-sm">
                          {profile.likesCount || 0}
                        </span>
                      </div>
                    </div>

                    <div className="flex  justify-center gap-4 text-gray-600 items-center mt-4">
                      <div className="flex flex-col items-center">
                        <span className="font-medium">Age</span>
                        <p className="text-sm">{profile.age}</p>
                      </div>
                      |
                      <div className="flex flex-col items-center">
                        <span className="font-medium">Occupation</span>
                        <p className="text-sm uppercase">
                          {profile.occupation}
                        </p>
                      </div>
                      |
                      <div className="flex flex-col items-center">
                        <span className="font-medium">City</span>
                        <p className="text-sm  uppercase"> {profile.city}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="w-full mt-4  bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-all">
                      View Profile
                    </button>
                    <button
                      onClick={() =>
                        handleRemoveFromWishlist(profile.profileId)
                      }
                      className="w-full text-sm mt-4 border-2 border-pink-600 text-pink-600 py-2 rounded-lg transition-all"
                    >
                      You Don't Like
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
