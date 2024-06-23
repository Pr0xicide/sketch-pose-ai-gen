const { OPENAI_CONFIG, generateOpenAIPhotos } = require('../model/OpenAI')

test('Rate limit exceeded', async () => {
  // process.env.OPENAI_API_KEY = process.env.EMPTY_OPENAI_API_KEY
  OPENAI_CONFIG.IMAGE_RESOLUTION = '256x256'

  const timeDurations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const session = await generateOpenAIPhotos(timeDurations)
  expect(session.length).toBe(0)
})
