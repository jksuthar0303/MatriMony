"use client";

import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedProfiles, setLikedProfiles] = useState({});

  // Fetch wishlist from the API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/wishlists", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (!response.ok) {
          const errorData = await response.json();
          // Throw an error with the message from the response
          throw new Error(errorData.message || "Failed to fetch wishlist");
        }

        const data = await response.json();

        if (data.message) {
          // Handle specific messages from the API (e.g., user not logged in, no wishlist available)
          setError(data.message);
          return; // Stop further processing if there's a specific error message
        }

        // Now you can access data.wishlist as per the backend response
        setWishlist(data.wishlist || []); // Set the wishlist data

        // Initialize likedProfiles to true for profiles already in the wishlist
        const initialLikedProfiles = {};
        data.wishlist.forEach((profile) => {
          initialLikedProfiles[profile.profileId] = true;
        });
        setLikedProfiles(initialLikedProfiles);
      } catch (err) {
        // Catch any error (including network errors) and set it
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddinWishlist = async (wishlistUserId) => {
    try {
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

      // Toggle the like status in the likedProfiles state
      setLikedProfiles((prev) => ({
        ...prev,
        [wishlistUserId]: !prev[wishlistUserId],
      }));

      alert(data.message);
    } catch (error) {
      alert(error.message || "Failed to update wishlist");
    }
  };
  const handleRemoveFromWishlist = async (wishlistUserId) => {
    try {
      const response = await fetch("/api/wishlists", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are sent
        body: JSON.stringify({ wishlistUserId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Update the wishlist state by filtering out the removed user
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.profileId !== wishlistUserId)
      );

      alert(data.message); // Show success message
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
          {wishlist.length > 0 ? (
            wishlist.map((profile) => (
              <div
                key={profile.profileId}
                className="bg-white h-[450px] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-100"
              >
                <img
                  src={profile.image || "https://via.placeholder.com/150"}
                  alt={profile.name}
                  className="w-full h-72 object-cover rounded-md"
                />
                <div className="mt-4 text-center">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg md:text-xl font-bold text-center text-pink-600">
                      {profile.name}
                    </h2>
                    <div
                      onClick={() => {
                        if (likedProfiles[profile.profileId]) {
                          handleRemoveFromWishlist(profile.profileId); // Remove from wishlist if already liked
                        } else {
                          handleAddinWishlist(profile.profileId); // Add to wishlist if not liked
                        }
                      }}
                      className="cursor-pointer"
                      title={
                        likedProfiles[profile.profileId]
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      {likedProfiles[profile.profileId] ? (
                        <FaHeart color="red" size={20} /> // Filled heart when in wishlist
                      ) : (
                        <FaRegHeart color="red" size={20} /> // Outlined heart when not in wishlist
                      )}
                    </div>
                  </div>
                  <p className="text-center mt-2 text-gray-600 text-sm md:text-base">
                    Age: {profile.age} | {profile.occupation} |{" "}
                    {profile.location}
                  </p>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <Link href={`/profile/${profile.profileId}`} passHref>
                    <button className="text-white p-2 rounded-lg w-56 bg-pink-600 hover:bg-pink-700 transition-all">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
         null
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
