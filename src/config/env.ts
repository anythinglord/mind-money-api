import dotenv from 'dotenv';
dotenv.config(); 

export const {
  PORT = '3000',
  NODE_ENV = 'development',
  RESEND_KEY
} = process.env;