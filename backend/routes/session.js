const express = require('express')
const rateLimit = require('express-rate-limit')
const placeholderPhotos = require('../placeholder.photos')

const router = express.Router()
require('dotenv').config()

const AI_MAX_REQUESTS = 10 // https://platform.openai.com/docs/guides/images/usage
const MAX_RATE_LIMIT = 1000
const MINUTE_TIME_WINDOW = 1
const limiter = rateLimit({
  windowMs: MINUTE_TIME_WINDOW * 60 * 1000,
  max: MAX_RATE_LIMIT,
  message: {
    success: false,
    data: {
      message: 'Too many requests from this IP, please try again later.',
    },
  },
})

const generateDevSession = (photos, sessionDurations) => {
  for (let i = 0; i < sessionDurations.length; i++) {
    photos.push({
      duration: sessionDurations[i],
      url: placeholderPhotos[i % placeholderPhotos.length],
    })
  }
}

const createSession = async (bodyParams) => {
  const { pose, sessionDurations, env } = bodyParams
  let photos = []

  // For local development, use local images to prevent billing.
  if (env === 'development') {
    generateDevSession(photos, sessionDurations)
  }

  // Use OpenAI.
  else {
    // Number calls to OpenAI image generation, based on the max limit.
    const apiRounds = Math.ceil(sessionDurations.length / AI_MAX_REQUESTS)
    for (let i = 0; i < apiRounds; i++) {
      generateSessionPhotos(photos, sessionDurations.splice(0, AI_MAX_REQUESTS))
    }
  }

  return new Promise((resolve, reject) => {
    resolve({ env, pose, photos })
  })
}

const generateSessionPhotos = async (photos, sessionDurations) => {
  // OpenAI image API request body params.
  // https://platform.openai.com/docs/guides/images/usage
  // {
  //   "prompt": "...",
  //   "n": 2,
  //   "size": "1024x1024"
  // }
  // OpenAI image response example.
  // {
  //   "created": ...,
  //   "data": [
  //       {"url": "..."},
  //       ...
  //   ]
  // }
}

router.post('/create', limiter, async (req, res) => {
  // Generate photos.
  const message = await createSession(req.body)

  await res.send({
    success: true,
    data: message,
  })
})

module.exports = router
