const express = require('express')
const rateLimit = require('express-rate-limit')
const placeholderPhotos = require('../placeholder.photos')

const router = express.Router()
require('dotenv').config()

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

const generatePhotos = async (params) => {
  const { pose, sessionDurations, env } = params
  const photos = []

  // Use placeholder images to prevent excessive billing when testing locally.
  if (env === 'development') {
    for (let i = 0; i < sessionDurations.length; i++) {
      photos.push({
        duration: sessionDurations[i],
        url: placeholderPhotos[i % placeholderPhotos.length],
      })
    }
  }

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

  return new Promise((resolve, reject) => {
    resolve({
      env,
      pose,
      photos,
    })
  })
}

router
  .get('/', async (req, res) => {
    res.send({
      message: 'Session',
    })
  })
  .post('/create', limiter, async (req, res) => {
    // Generate photos.
    const message = await generatePhotos(req.body)

    await res.send({
      success: true,
      data: message,
    })
  })

module.exports = router
