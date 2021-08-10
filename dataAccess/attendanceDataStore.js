import sqlite3 from 'sqlite3';
import { initializeTables, getByAttendanceIDCmd, searchAttendanceCmd, insertAttendanceCmd, updateAttendanceCmd, deleteAttendanceCmd } from '../helpers/sqlQueries.js'

const db = new sqlite3.Database('./localDatabase.db');
const attendanceTblCmd = initializeTables('attendance')

db.run(`${attendanceTblCmd}`)



export default class AttendanceDataStore {
    getByAttendanceID = async (attendanceID) => {
        return new Promise((resolve, reject) => {
            db.all(getByAttendanceIDCmd, [attendanceID], (err, rows) => {
                resolve(rows)
            });
        })
    }

    searchAttendance = async (memberID, eventID) => {
        return new Promise((resolve, reject) => {
            db.all(searchAttendanceCmd, [memberID, eventID], (err, rows) => {
                resolve(rows)
            });
        })
    }

    insertAttendance = async (attendance) => {
        db.serialize(() => {
            db.run(insertAttendanceCmd, [attendance.timeIn, attendance.timeOut, attendance.memberID, attendance.eventID])
        })
    }

    updateAttendance = async (attendance) => {
        db.serialize(() => {
            db.run(updateAttendanceCmd, [attendance.timeIn, attendance.timeOut, attendance.attendanceID])
        })
    }

    deleteAttendance = async (attendanceID) => {
        db.serialize(() => {
            db.run(deleteAttendanceCmd, [attendanceID])
        })
    }
}
