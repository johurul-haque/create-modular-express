import { catchAsync } from '@utils';
import { AnyZodObject, ZodEffects } from 'zod';

export function validateRequest(
  schema: AnyZodObject | ZodEffects<AnyZodObject>
) {
  return catchAsync(async (req, _, next) => {
    req.body = await schema.parseAsync(req.body);
    next();
  });
}
