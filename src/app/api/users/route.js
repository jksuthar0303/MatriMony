import connectMongo from '../../../lib/dB';
import User from '../../../models/User';
import { authenticate } from '../../../lib/authMiddleware'; 

export async function GET(req) {
  try {
    await connectMongo();

 
    const userId = authenticate(req);

    if (!userId) {

      const users = await User.find().select('fullName profilePic occupation age city'); 
      return new Response(JSON.stringify(users), { status: 200 });
    }


    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }

    // If the user exists and is authenticated, get the wishlist of the logged-in user
    const userWishlist = loggedInUser?.wishlist.map(item => item.userId);

    // Exclude users in the logged-in user's wishlist and only return selected fields
    const excludedUsers = [...userWishlist, loggedInUser._id];

    const users = await User.find({
      '_id': { $nin: excludedUsers }
    }).select('fullName profilePic occupation age city');
    // Return the filtered users list with selected fields
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);  
    return new Response(
      JSON.stringify({ message: 'Error fetching users', error: error.message }),
      { status: 500 }
    );
  }
}



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