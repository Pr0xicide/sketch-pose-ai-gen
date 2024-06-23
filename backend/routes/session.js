const express = require('express')
const rateLimit = require('express-rate-limit')

const { createDevSession } = require('../model/Development')
const { generateOpenAIPhotos } = require('../model/OpenAI')

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

const createSession = async (bodyParams) => {
  const { pose, sessionDurations, env } = bodyParams
  let photos = []

  if (env === 'development') photos = createDevSession(sessionDurations)
  else photos = await generateOpenAIPhotos(sessionDurations)

  return new Promise((resolve) => {
    if (photos.length > 0) {
      resolve({
        success: true,
        data: { env, pose, photos },
      })
    } else {
      resolve({
        success: false,
        data: {
          message: `Failed to retrieve photos from AI model ${process.env.AI_MODEL}`,
        },
      })
    }
  })
}

router.post('/create', limiter, async (req, res) => {
  res.send(await createSession(req.body))
})

module.exports = router
