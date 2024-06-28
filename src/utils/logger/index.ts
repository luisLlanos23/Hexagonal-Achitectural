import Winston, { format, transports } from 'winston'
import { Paths } from 'src/constants/Paths'

const logs = Winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: `${Paths.logFolder}/logs.log`, level: 'info' }),
  ]
});

const errorLogs = Winston.createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: `${Paths.logFolder}/errors.log`, level: 'error' }),
  ]
});

export function buildLogger(origin: string) {
  return {
    log: (message: string) => logs.log('info', { message, origin }),
    error: (message: string) => errorLogs.error('error', { message, origin })
  }
}
