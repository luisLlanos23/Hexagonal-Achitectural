import Fs from 'fs'
import Dotenv from 'dotenv'
import { Paths } from 'src/constants/Paths'
import { setUpDB } from 'src/infrastructure/db'
import { setUpServer } from 'src/infrastructure/rest/server'
import { getException } from 'src/utils/exceptions'

async function main() {
  try {
    Dotenv.config()
    await setUpDB()
    await setUpServer()
    setUpDirectories()
  } catch (error) {
    getException('unExpected', error as unknown as string)
  }
}

function setUpDirectories() {
  Fs.mkdirSync(Paths.uploadFolder, { recursive: true })
  Fs.mkdirSync(Paths.downloadFolder, { recursive: true })
  Fs.mkdirSync(Paths.logFolder, { recursive: true })
}

main()