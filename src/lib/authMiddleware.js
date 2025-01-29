// src/lib/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticate = (req) => {

  const cookies = req.headers.get('Cookie');
  console.log("Received Cookies:", cookies);

  const token = cookies ? cookies.split('authToken=')[1]?.split(';')[0] : null;

  console.log("Extracted Token:", token);

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    return decoded.userId;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid or expired token');
  }
};
