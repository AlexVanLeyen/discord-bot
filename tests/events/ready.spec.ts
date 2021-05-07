import { handler } from '@/events/ready'
import { log } from '@/utils/log'

describe('ready event handler', () => {
  it('says it is ready', () => {
    const spy = jest.spyOn(log, 'info')
    handler()
    expect(spy).toHaveBeenCalledWith('Congratulations, your Discord bot has been successfully initialized!')
  })
})
