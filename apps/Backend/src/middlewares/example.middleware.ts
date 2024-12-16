import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getCookie } from "../functions/cookieFunc";

// Define the expected structure of the decoded JWT payload
interface TokenPayload {
  userId: string;
  // Add other optional fields, such as roles or permissions
  roles?: string[];
}

// Extend the `Express.Request` type to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload; // Attach the decoded user payload to `req.user`
    }
  }
}

// Middleware to verify the JWT from cookies
export const verifyCookie = (req: Request, res: Response, next: NextFunction): any => {
  try {
    // Extract the token from cookies
    const cookies = req?.headers?.cookie || "" ;

    const token = getCookie(cookies , "token");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    // Attach the decoded payload to `req.user` for use in subsequent middleware or routes
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error:any) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};
