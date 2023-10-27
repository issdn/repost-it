import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(`./.env.${process.env.NODE_ENV}.local`) });

const { CLERK_SECRET_KEY, CLERK_PUBLISHABLE_KEY, GOOGLE_API_KEY } = process.env;

const config = {
  clerkSecretKey: CLERK_SECRET_KEY as string,
  clerkPublishableKey: CLERK_PUBLISHABLE_KEY as string,
  googleApiKey: GOOGLE_API_KEY as string,
} as const;

let error = String();
Object.entries(config).forEach((configEntry) => {
  if (!configEntry[1]) {
    error = error.concat(`Missing variable "${configEntry[0]}"\n`);
  }
});

if (error) throw error;

export default config;
