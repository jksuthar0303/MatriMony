// src/app/api/users/index.js
import connectMongo from '../../../lib/dB';
import User from '../../../models/User';

export async function GET() {
  try {
    await connectMongo();
    const users = await User.find();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching users', error }), { status: 500 });
  }
}
export async function POST(req) {
  try {
    await connectMongo();

    // Parse JSON data from request body
    const body = await req.json();
    const { name, email, age } = body;

    // Validate required fields
    if (!name || !email) {
      return new Response(JSON.stringify({ message: 'Name and Email are required' }), { status: 400 });
    }

    // Create a new user in the database
    const newUser = new User({ name, email, age });
    await newUser.save();

    return new Response(JSON.stringify({ message: 'User created successfully', user: newUser }), { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ message: 'Error creating user', error: error.message }), { status: 500 });
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