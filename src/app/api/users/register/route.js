import connectMongo from "../../../../lib/dB";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

// Configure Cloudinary directly within the same file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(req) {
  try {
    await connectMongo();

    const {
      fullName,
      gender,
      fatherName,
      motherName,
      mobile,
      whatsapp,
      email,
      age,
      dob,
      caste,
      subCaste,
      motherSubCaste,
      qualification,
      occupation,
      manglik,
      divyang,
      siblings,
      paternalUncle,
      paternalAunt,
      maternalUncle,
      maternalAunt,
      state,
      city,
      pincode,
      address,
      password,
      agree,
      profilePic, // Expecting a base64 image here
    } = await req.json();

    // Validate required fields
    const requiredFields = [
      fullName, gender, fatherName, motherName, mobile, whatsapp, email, dob,
      caste, subCaste, motherSubCaste, qualification, occupation, state, city, pincode, address, password, agree,
    ];

    if (requiredFields.includes(undefined) || !agree) {
      return new Response(
        JSON.stringify({
          message: "All required fields must be filled, and terms must be agreed to.",
        }),
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // Handle image upload to Cloudinary if profilePic exists
    let profilePicUrl = "";
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "user_profiles", 
        transformation: [{ width: 200, height: 200, crop: "thumb" }], 
      });

      profilePicUrl = uploadResponse.secure_url;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save to MongoDB
    const newUser = new User({
      fullName,
      gender,
      fatherName,
      motherName,
      mobile,
      whatsapp,
      email,
      age: age || 18, 
      dob,
      caste,
      subCaste,
      motherSubCaste,
      qualification,
      occupation,
      manglik: manglik || "No", 
      divyang: divyang || "No", 
      siblings,
      paternalUncle,
      paternalAunt,
      maternalUncle,
      maternalAunt,
      state,
      city,
      pincode,
      address,
      password: hashedPassword,
      agree,
      profilePic: profilePicUrl, 
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Set token in cookie
    const cookieOptions = {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
    };

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        token,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `authToken=${token}; ${Object.entries(cookieOptions)
            .map(([key, value]) => `${key}=${value}`)
            .join("; ")}`,
        },
      }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(
      JSON.stringify({
        message: "Error registering user",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

