const { createDevSession } = require('../model/Development')

test('development session structure', () => {
  const time = 15000
  const session = createDevSession([time])
  expect(session.length).toBe(1)
  expect(session[0].duration).toBe(time)
})
