import { registerAs } from '@nestjs/config';

export default registerAs('profileConfig', () => ({
  apikey: process.env.PROFILE_API_KEY,
}));
