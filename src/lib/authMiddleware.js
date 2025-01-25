// src/lib/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticate = (req) => {
  // Extract token from cookies
  const cookies = req.headers.cookie;
  const token = cookies ? cookies.split('authToken=')[1]?.split(';')[0] : null;

  if (!token) {
    throw new Error('Authorization token is required');
  }

  try {
    // Decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // You can add extra checks for user role or permissions here, if needed
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid or expired token');
  }
};
