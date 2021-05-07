import { promises as fs } from 'fs'
import { Collection as DiscordCollection } from 'discord.js'
import { Collection } from '@/types'
import { log } from '@/utils/log'

/**
 * @param path
 * @returns a promise containing a collection filled with modules that match the given ModuleInterface
 */
export async function loadCollection <ModuleInterface> (path: string): Promise<Collection<ModuleInterface>> {
  const collection = new DiscordCollection<string, ModuleInterface>()
  const files = await fs.readdir(path).catch((err) => {
    log.error(err)
    return []
  })
  files.forEach((file) => {
    if (!isValidFile(file)) return
    const name = getNameFromFile(file)
    try {
      const module = loadModuleWithoutCache<ModuleInterface>(`${path}/${file}`)
      collection.set(name, module)
    } catch (err) {
      log.error(err)
    }
  })
  return collection
}

/**
 * @param file
 * @returns
 */
function getNameFromFile (file: string): string {
  return file.split('.')[0]
}

/**
 * Determine if the file is a valid module
 * @param file
 * @returns
 */
function isValidFile (file: string): boolean {
  return file.endsWith('.js')
}

/**
 * Loads a module from path, but removes it from
 * the require cache.
 * @param path
 * @returns the loaded module
 */
function loadModuleWithoutCache <ModuleInterface> (path: string) {
  const module: ModuleInterface = require(path)
  delete require.cache[require.resolve(path)]
  return module
}
