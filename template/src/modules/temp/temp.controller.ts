import { Request, Response } from "express";
import { sendResponse } from "@/utils/send-response";

export function sendMessage(req: Request, res: Response) {
  return sendResponse(res, {
    message: "Hello world!",
  });
}
