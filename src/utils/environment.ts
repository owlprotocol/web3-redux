import path from 'path';
import dotenv from 'dotenv';
// Process environment variables

export const NODE_ENV = process.env.NODE_ENV;

let defaultEnv;
if (NODE_ENV === 'production') defaultEnv = '.env';
else if (NODE_ENV === 'development') defaultEnv = '.env.development';
else if (NODE_ENV === 'test') defaultEnv = '.env.test';

//Pass custom env file arg
const args = process.argv;
const argEnv = args.length > 2 ? args[2] : undefined;
//Arg must start with .env
const envFileName = argEnv && argEnv.startsWith('.env') ? argEnv : defaultEnv;
const envFile = envFileName ? path.resolve(process.cwd(), envFileName) : undefined;
if (envFile) dotenv.config({ path: envFile });

export const NAME = process.env.NAME;
