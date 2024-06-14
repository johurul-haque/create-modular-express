import { Response } from "express";

type opts<T> = {
  status: number;
  success?: boolean;
  message: string;
  data?: T;
};

export function sendResponse<T>(
  res: Response,
  { status = 200, success = true, ...rest }: opts<T>,
) {
  return res.status(status).json({ success, ...rest });
}
