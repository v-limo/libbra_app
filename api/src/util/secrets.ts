import dotenv from 'dotenv'
import fs from 'fs'

import logger from './logger'

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: '.env' })
} else {
  logger.debug('Using .env.example file to supply config environment variables')
  dotenv.config({ path: '.env.example' }) // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'

export const JWT_SECRET = process.env['JWT_SECRET'] as string
export const MONGODB_URI = process.env['MONGODB_URI'] as string

//   (
//   prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL']
// ) as string

if (!JWT_SECRET) {
  logger.error('No client secret. Set JWT_SECRET environment variable.')
  process.exit(1)
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      'No mongo connection string. Set MONGODB_URI environment variable.'
    )
  } else {
    logger.error(
      'No mongo connection string. Set MONGODB_URI_LOCAL environment variable.'
    )
  }
  process.exit(1)
}

export const FACEBOOK_ID = process.env.FACEBOOK_ID as string
export const FACEBOOK_SECRET = process.env.FACEBOOK_SECRET as string

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string
