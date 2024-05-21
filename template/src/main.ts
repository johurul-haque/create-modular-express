import { env } from '@/config/env';
import app from 'app';
import mongoose from 'mongoose';

(async function () {
  try {
    await mongoose.connect(env.MONGODB_URI);

    app.listen(env.PORT, () => {
      console.log(`Server listening on ${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
