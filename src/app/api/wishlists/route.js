import connectMongo from '../../../lib/dB';  
import User from '../../../models/User';
import { authenticate } from '../../../lib/authMiddleware'; 

export async function POST(req) {
  try {
    // Authenticate the user
    const userId = authenticate(req); // Extract logged-in user ID
    const { wishlistUserId } = await req.json();

    if (!wishlistUserId) {
      return new Response(
        JSON.stringify({ message: 'User ID to wishlist is required' }),
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongo();

    // Find the user to be added to the wishlist
    const userToWishlist = await User.findById(wishlistUserId);
    if (!userToWishlist) {
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }

    // Find the logged-in user
    const currentUser = await User.findById(userId);

    // Check if the user is already in the wishlist
    const alreadyInWishlist = currentUser.wishlist.some(
      (item) => item.userId.toString() === wishlistUserId
    );

    if (alreadyInWishlist) {
      return new Response(
        JSON.stringify({ message: 'User already in wishlist' }),
        { status: 400 }
      );
    }

    // Check if the liked user has already added the logged-in user
    const mutualLike = userToWishlist.wishlist.some(
      (item) => item.userId.toString() === userId
    );

    // Add the profile to the logged-in user's wishlist
    currentUser.wishlist.push({
      userId: wishlistUserId,
      isMutual: mutualLike,
    });

    // Save the current user's updated wishlist
    await currentUser.save();

    // If mutual, update the other user's wishlist too
    if (mutualLike) {
      userToWishlist.wishlist.forEach((item) => {
        if (item.userId.toString() === userId) {
          item.isMutual = true;
        }
      });
      await userToWishlist.save();
    }

    return new Response(
      JSON.stringify({
        message: mutualLike
          ? 'Mutual wishlist! Both users liked each other'
          : 'User added to wishlist',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error adding to wishlist', error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectMongo();

    // Authenticate the user
    const userId = authenticate(req);

    if (!userId) {
      // If user is not authenticated, return a login prompt message
      return new Response(
        JSON.stringify({ message: "Please log in to view your wishlist" }),
        { status: 401 } // Unauthorized
      );
    }

    // Fetch the logged-in user's data
    const user = await User.findById(userId).populate("wishlist.userId", "name age occupation location image");

    if (!user) {
      // If user not found
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 } // Not Found
      );
    }

    // Check if the user has a wishlist
    if (user.wishlist.length === 0) {
      return new Response(
        JSON.stringify({ message: "No wishlist added with you" }),
        { status: 200 } // Success, but no wishlist
      );
    }

    // If wishlist exists, return the data
    return new Response(
      JSON.stringify({
        wishlist: user.wishlist.map((item) => ({
          profileId: item.userId._id,
          name: item.userId.name,
          age: item.userId.age,
          occupation: item.userId.occupation,
          location: item.userId.location,
          image: item.userId.image,
          isMutual: item.isMutual,
        })),
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching wishlist", error: error.message }),
      { status: 500 } // Internal Server Error
    );
  }
}


export async function DELETE(req) {
  try {
    await connectMongo();

    const userId = authenticate(req);
    const { wishlistUserId } = await req.json();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.userId.toString() !== wishlistUserId
    );

    await user.save();

    return new Response(
      JSON.stringify({ message: "User removed from wishlist" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error removing from wishlist", error: error.message }),
      { status: 500 }
    );
  }
}