// src/types/types.ts
import { Request, Response, NextFunction } from 'express';

export type RequestHandler = (req: Request, res: Response, next?: NextFunction) => void;
