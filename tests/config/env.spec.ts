describe('Environment variables', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  it('should use default prefix if none found', () => {
    delete process.env.BOT_COMMAND_PREFIX
    const prefix = require('../../src/config/env').prefix
    expect(prefix).toBe('!')
  })

  it('should use prefix if found', () => {
    process.env.BOT_COMMAND_PREFIX = '?'
    const prefix = require('../../src/config/env').prefix
    expect(prefix).toBe(process.env.BOT_COMMAND_PREFIX)
  })
})
