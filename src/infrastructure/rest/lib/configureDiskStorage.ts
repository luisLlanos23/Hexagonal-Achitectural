import Fs from 'fs'
import Multer from 'multer'
import { Paths } from 'src/constants/Paths'

export function configureDiskStorage() {
  return Multer.diskStorage({
    destination: (_req, _file, cb) => {
      Fs.mkdirSync(Paths.uploadFolder, { recursive: true })
      cb(null, Paths.uploadFolder)
    },
    filename: (_req, file, cb) => {
      cb(null, file.originalname)
    }
  })
}