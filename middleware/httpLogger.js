import winston from 'winston'
import moment from 'moment'

const dateNow = moment().format("YYYY-MM-DD");

const levels = {
    info: 2
}

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.align(),
    winston.format.printf(info => `${[info.timestamp]}: ${info.message}`),
)

const transports = [
    new winston.transports.File({ filename: `logs/AttendanceMonitoringLogs-${dateNow}.txt` }),
]


export const Logger = winston.createLogger({
    levels,
    format,
    transports
});