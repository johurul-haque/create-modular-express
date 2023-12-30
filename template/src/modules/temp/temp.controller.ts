import { Request, Response } from 'express';

export function sendMessage(req: Request, res: Response) {
  return res.status(200).json({
    message: 'Hello word!',
  });
}
