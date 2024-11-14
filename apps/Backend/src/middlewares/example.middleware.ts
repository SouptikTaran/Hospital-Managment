import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface TokenPayload {
    userId: string;
    // Add other fields as needed, like roles or permissions
}

// Extending the Request type here
declare global {
    namespace Express {
      interface Request {
        user?: any; // Replace `any` with your user type
      }
    }
  }
  

// Middleware to verify the cookie token
export const verifyCookie = (req: Request, res: Response, next: NextFunction)=> {
    try {
        // Extract the token from cookies
        const token = req.cookies['token'];
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the token using your JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

        // Attach the decoded data to the request object for future use
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};
