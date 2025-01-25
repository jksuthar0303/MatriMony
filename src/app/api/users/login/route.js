import connectMongo from '../../../../lib/dB';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export async function POST(req) {
    try {
      await connectMongo();
  
      const { email, password } = await req.json();
  
      // Validate required fields
      if (!email || !password) {
        return new Response(
          JSON.stringify({ message: 'Email and password are required' }),
          { status: 400 }
        );
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return new Response(
          JSON.stringify({ message: 'User not found' }),
          { status: 404 }
        );
      }
  
      // Compare provided password with stored hash
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return new Response(
          JSON.stringify({ message: 'Invalid credentials' }),
          { status: 401 }
        );
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      // Set token in HTTP-only cookie (secure option, prevent client-side access)
      const cookieOptions = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Ensure it's only sent over HTTPS in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      };
  
      return new Response(
        JSON.stringify({ message: 'Login successful' }),
        {
          status: 200,
          headers: {
            'Set-Cookie': `authToken=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: 'Error logging in user', error: error.message }),
        { status: 500 }
      );
    }
}
export async function GET(req) {
  const cookies = req.headers.get('cookie') || '';
  const parsedCookies = parse(cookies);
  const token = parsedCookies.authToken;

  if (!token) {
    return new Response(
      JSON.stringify({ isAuthenticated: false }),
      { status: 200 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return new Response(
      JSON.stringify({ isAuthenticated: true, userId: decoded.userId }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ isAuthenticated: false }),
      { status: 200 }
    );
  }
}