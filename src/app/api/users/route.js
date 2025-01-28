// src/app/api/users/index.js
import connectMongo from '../../../lib/dB';
import User from '../../../models/User';
import { authenticate } from '../../../lib/authMiddleware'; 

export async function GET(req) {
  try {
    await connectMongo();

    // Authenticate the user (this might return null if the user is not authenticated)
    const userId = authenticate(req);

    if (!userId) {
      // If no valid userId, return all users (no exclusion) with selected fields
      const users = await User.find().select('fullName profilePic occupation age');  // Specify the fields to return
      return new Response(JSON.stringify(users), { status: 200 });
    }

    // If userId is valid (user is authenticated), fetch the logged-in user's details
    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      // If the logged-in user doesn't exist, return an error
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }

    // If the user exists and is authenticated, get the wishlist of the logged-in user
    const userWishlist = loggedInUser?.wishlist.map(item => item.userId);

    // Exclude users in the logged-in user's wishlist and only return selected fields
    const users = await User.find({
      '_id': { $nin: userWishlist }
    }).select('fullName profilePic occupation age');  // Specify the fields to return

    // Return the filtered users list with selected fields
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);  // Log server-side error
    return new Response(
      JSON.stringify({ message: 'Error fetching users', error: error.message }),
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     await connectMongo();
//     const users = await User.find();
//     return new Response(JSON.stringify(users), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Error fetching users', error }), { status: 500 });
//   }
// }

export async function PUT(req) {
  try {
    await connectMongo();

    // Extract the 'id' from the URL query params
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: 'User ID is required' }), { status: 400 });
    }

    const body = await req.json();
    const { name, email, age } = body;

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User updated successfully', user: updatedUser }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating user', error: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ message: 'User ID is required' }), { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting user', error: error.message }), { status: 500 });
  }
}