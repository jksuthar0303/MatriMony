import { parse } from 'cookie';
import jwt from 'jsonwebtoken';


export async function GET(req) {
    const cookies = req.headers.get('cookie') || '';
    const parsedCookies = parse(cookies);
    const token = parsedCookies.authToken;
  console.log(token);
  
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
  