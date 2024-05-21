import 'dotenv/config';
import { z } from 'zod';

export const env = z
  .object({
    PORT: z.number().default(8080),
    MONGODB_URI: z.string().url(),
    IS_DEV: z.boolean().default(process.env.NODE_ENV !== 'production'),
  })
  .parse(process.env);
