import Fs from 'fs'
import Dotenv from 'dotenv'
import { Paths } from 'src/constants/Paths'
import { setUpDB } from 'src/infrastructure/db'
import { setUpServer } from 'src/infrastructure/rest/server'
import { getException } from 'src/utils/exceptions'

async function main() {
  try {
    Dotenv.config()
    setUpDirectories()
    await setUpDB()
    await setUpServer()
  } catch (error) {
    getException('unExpected', error as unknown as string)
  }
}

function setUpDirectories() {
  Fs.rmSync(Paths.uploadFolder, { recursive: true, force: true })
  Fs.rmSync(Paths.downloadFolder, { recursive: true, force: true })
  Fs.rmSync(Paths.logFolder, { recursive: true, force: true })
  Fs.mkdirSync(Paths.uploadFolder, { recursive: true })
  Fs.mkdirSync(Paths.downloadFolder, { recursive: true })
  Fs.mkdirSync(Paths.logFolder, { recursive: true })
}

main()