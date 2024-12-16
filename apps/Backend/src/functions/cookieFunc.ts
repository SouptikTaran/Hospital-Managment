import { Request, Response } from "express";

export const getCookie = (cookieString: string, cookieName: string): string | undefined => {
  const cookies = cookieString.split(';').map(cookie => cookie.trim());
  const targetCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
  return targetCookie ? targetCookie.split('=')[1] : undefined;
};

