// src/lib/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticate = (req) => {
  // Log the cookies to ensure they are received
  const cookies = req.headers.get('Cookie');
  console.log("Received Cookies:", cookies);

  // Extract token from cookies
  const token = cookies ? cookies.split('authToken=')[1]?.split(';')[0] : null;

  console.log("Extracted Token:", token);

  if (!token) {
    return null
  }

  try {
    // Decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // You can add extra checks for user role or permissions here, if needed
    return decoded.userId;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid or expired token');
  }
};
