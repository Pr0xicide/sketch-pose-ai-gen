/**
 * TODO:
 * - Connecting /w OpenAI API
 * - using OpenAI's image generation API endpoint
 * - return an array of photos back to the session API endpoint
 *
 */
const OpenAI = require('openai')
const placeholderPhotos = require('../placeholder.photos')
require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const OPENAI_CONFIG = {
  AI_MODEL: 'dall-e-2',
  AI_MAX_REQUESTS: 10,
  IMAGE_RESOLUTION: '1024x1024',
}

const generateOpenAIPhotos = async (sessionDurations) => {
  // Number of calls to OpenAI based on the maximum requests.
  const apiRounds = Math.ceil(
    sessionDurations.length / OPENAI_CONFIG.AI_MAX_REQUESTS
  )
  const photos = []
  const promises = []

  try {
    for (let i = 0; i < apiRounds; i++) {
      // const block = sessionDurations.splice(0, OPENAI_CONFIG.AI_MAX_REQUESTS)
      // https://platform.openai.com/docs/guides/images/usage
      // const response = await openai.images.generate({
      //   model: OPENAI_CONFIG.AI_MODEL,
      //   size: OPENAI_CONFIG.IMAGE_RESOLUTION,
      //   n: block.length,
      //   prompt: "a human standing in broad daylight",
      // })
      // for (let j = 0; j < response.data.length; j++) {
      //   photos.push({
      //     duration: block[j],
      //     url: response.data[j].url,
      //   })
      // }
      // response.data.forEach(image => {
      //   photos.push({
      //     duration: block[j],
      //     url: placeholderPhotos[j % placeholderPhotos.length],
      //   })
      // });
      // for (let j = 0; j < block.length; j++) {
      //   photos.push({
      //     duration: block[j],
      //     url: placeholderPhotos[j % placeholderPhotos.length],
      //   })
      // }
    }

    return photos
  } catch (e) {
    const { error } = e
    return error.code
  }
}

module.exports = {
  OPENAI_CONFIG,
  generateOpenAIPhotos,
}
