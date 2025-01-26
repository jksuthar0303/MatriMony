// src/app/api/users/register/route.js
import connectMongo from "../../../../lib/dB";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
      await connectMongo();
  
      const {
        name,
        gender,
        mobile,
        email,
        password,
        dateOfBirth,
        agree,
      } = await req.json();
  
      // Validate required fields
      if (
        !name ||
        !gender ||
        !mobile ||
        !email ||
        !password ||
        !dateOfBirth ||
        agree === undefined
      ) {
        return new Response(
          JSON.stringify({ message: "All fields are required" }),
          { status: 400 }
        );
      }
  
      // Ensure user agrees to terms
      if (!agree) {
        return new Response(
          JSON.stringify({ message: "You must agree to the terms to register" }),
          { status: 400 }
        );
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response(
          JSON.stringify({ message: "User already exists" }),
          { status: 400 }
        );
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create and save new user
      const newUser = new User({
        name,
        gender,
        mobile,
        email,
        password: hashedPassword,
        dateOfBirth,
      });
  
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // Token valid for 7 days
      );
   // Set token in HTTP-only cookie (secure option, prevent client-side access)
   const cookieOptions = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production', 
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/', 
  };

      // Return response with token in header
      return new Response(
        JSON.stringify({ message: "User registered successfully", token }),
        {
            status: 200,
            headers: {
              'Set-Cookie': `authToken=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`,
            },
          }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "Error registering user",
          error: error.message,
        }),
        { status: 500 }
      );
    }
  }
  
