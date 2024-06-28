import Path from 'path'

export const Paths = {
  resources: `${Path.join(__dirname, '../../resources')}`,
  get uploadFolder() {
    return `${Path.join(Paths.resources, 'uploads')}`
  },
  get downloadFolder() {
    return `${Path.join(Paths.resources, 'downloads')}`
  },
  get logFolder() {
    return `${Path.join(__dirname, '../../logs')}`
  },
}