import connectMongo from '../../../../lib/dB';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export async function POST(req) {
    try {
      await connectMongo();
  
      const { email, password } = await req.json();
  
      if (!email || !password) {
        return new Response(
          JSON.stringify({ message: 'Email and password are required' }),
          { status: 400 }
        );
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return new Response(
          JSON.stringify({ message: 'User not found' }),
          { status: 404 }
        );
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return new Response(
          JSON.stringify({ message: 'Invalid credentials' }),
          { status: 401 }
        );
      }
  
      const token = jwt.sign(
        { userId: user._id, email: user.email,subCaste: user.subCaste,motherSubCaste: user.motherSubCaste },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
  
      
      const cookieOptions = {
        httpOnly: true,
       
        maxAge: 30 * 24 * 60 * 60 * 1000,

        path: '/',
      };
  
      return new Response(
        JSON.stringify({ message: 'Login successful',token }),
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
    try {
        // Parse cookies to extract authToken
        const cookies = req.headers.get('cookie') || '';
        const parsedCookies = parse(cookies);
        const token = parsedCookies.authToken;

        if (!token) {
            return new Response(
                JSON.stringify({ message: 'No authentication token found', isAuthenticated: false }),
                { status: 401 }
            );
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Connect to MongoDB
        await connectMongo();

        // Fetch user details excluding password
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return new Response(
                JSON.stringify({ message: 'User not found' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ isAuthenticated: true, user }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching user details:", error);
        return new Response(
            JSON.stringify({ message: 'Error fetching user details', error: error.message }),
            { status: 500 }
        );
    }
}


