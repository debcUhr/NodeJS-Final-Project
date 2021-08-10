import express from 'express'
import * as attendanceController from '../controllers/attendanceController.js';
import { Logger } from '../middleware/httpLogger.js'
import { formatHttpLog } from '../helpers/formatHelper.js'

const attendanceRouter = express.Router();

attendanceRouter.post('/', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Attendance"));
    attendanceController.createAttendance(req, res, next)
});

attendanceRouter.put('/', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Attendance"));
    attendanceController.updateAttendance(req, res, next)
});


attendanceRouter.delete('/:id', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Attendance"));
    attendanceController.deleteAttendance(req, res, next)
});

export default attendanceRouter;