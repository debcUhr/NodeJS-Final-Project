import sqlite3 from 'sqlite3';
import { initializeTables, getAllEventsCmd, getByEventIDCmd, getMemberAttendanceByIDCmd, searchEventCmd, insertEventCmd, updateEventCmd, deleteEventCmd } from '../helpers/sqlQueries.js'
import moment from 'moment'

const db = new sqlite3.Database('./localDatabase.db');
const eventsTblCmd = initializeTables('events')

db.run(`${eventsTblCmd}`)


export default class EventsDataStore {
    getAllEvents = async () => {
        return new Promise((resolve, reject) => {
            db.all(getAllEventsCmd, (err, rows) => {
                resolve(rows)
            });
        })
    }

    getByEventID = async (eventID) => {
        return new Promise((resolve, reject) => {
            db.all(getByEventIDCmd, [eventID], (err, rows) => {
                resolve(rows)
            });
        })
    }

    getMemberAttendanceByID = async (eventID) => {
        return new Promise((resolve, reject) => {
            db.all(getMemberAttendanceByIDCmd, [eventID], (err, rows) => {
                resolve(rows)
            });
        })
    }


    searchEvent = async (eventName, dateStart, dateEnd) => {
        const convertedDateStart = moment(dateStart, "YYYY-MM-DD").format("YYYY-MM-DD")
        const convertedDateEnd = moment(dateEnd, "YYYY-MM-DD").format("YYYY-MM-DD")

        return new Promise((resolve, reject) => {
            db.all(searchEventCmd, [eventName, convertedDateStart, convertedDateEnd], (err, rows) => {
                resolve(rows)
            });
        })
    }

    insertEvent = async (event) => {
        db.serialize(() => {
            db.run(insertEventCmd, [event.eventName, event.eventType, event.startDateTime, event.endDateTime])
        })
    }

    updateEvent = async (event) => {
        db.serialize(() => {
            db.run(updateEventCmd, [event.eventName, event.eventType, event.startDateTime, event.endDateTime, event.eventID])
        })
    }

    deleteEvent = async (eventID) => {
        db.serialize(() => {
            db.run(deleteEventCmd, [eventID])
        })
    }
}
