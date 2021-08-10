import AttendanceDataStore from '../dataAccess/attendanceDataStore.js';
import EventDataStore from '../dataAccess/eventsDataStore.js';
import MemberDataStore from '../dataAccess/membersDataStore.js';
import Validator from 'validatorjs';
import { ErrorHandler } from '../helpers/errorHandler.js'
import { isObjectExisting } from '../helpers/validators.js'
import moment from 'moment'
import { invalidDateErr, invalidEventID, invalidMemberID } from '../helpers/customerErrorMessages.js'



export const createAttendance = async (req, res, next) => {
    try {
        const attDataStore = new AttendanceDataStore();
        const eventDataStore = new EventDataStore();
        const memberDataStore = new MemberDataStore();
        const { timeIn, timeOut, memberID, eventID } = req.body;

        const attendanceDetails = await attDataStore.searchAttendance(memberID, eventID);
        const memberDetails = await memberDataStore.getByMemberID(memberID)
        const eventDetails = await eventDataStore.getByEventID(eventID)

        const rules = {
            timeIn: 'required|date',
            timeOut: 'date|after:timeIn',
            memberID: 'required|integer',
            eventID: 'required|integer'
        }
        const validation = new Validator(req.body, rules);


        if (isObjectExisting(attendanceDetails)) {
            throw new ErrorHandler(409)
        }
        else if (validation.fails()) {
            throw new ErrorHandler(400)
        }
        else if (!isObjectExisting(memberDetails)) {
            throw new ErrorHandler(404, invalidMemberID)
        }
        else if (!isObjectExisting(eventDetails)) {
            throw new ErrorHandler(400, invalidEventID)
        }

        await attDataStore.insertAttendance(req.body)
        res.sendStatus(201)

        next()
    }
    catch (err) {
        next(err)
    }
}

export const updateAttendance = async (req, res, next) => {
    try {
        const dataStore = new AttendanceDataStore();
        const detailsByID = await dataStore.getByAttendanceID(req.body.attendanceID);

        const rules = {
            attendanceID: 'required|integer',
            timeIn: 'required'
        }
        const validation = new Validator(req.body, rules);

        if (!isObjectExisting(detailsByID)) {
            throw new ErrorHandler(404)
        }
        else if (validation.fails()) {
            throw new ErrorHandler(400)
        }
        else if (moment(req.body.timeIn).isSameOrAfter(moment(req.body.timeOut))) {
            throw new ErrorHandler(400, invalidDateErr)
        }

        await dataStore.updateAttendance(req.body)
        res.sendStatus(200);

        next()
    }
    catch (err) {
        next(err)
    }

}

export const deleteAttendance = async (req, res, next) => {
    try {
        const dataStore = new AttendanceDataStore();
        const { id } = req.params;

        const detailsByID = await dataStore.getByAttendanceID(id)

        if (!isObjectExisting(detailsByID)) {
            throw new ErrorHandler(404)
        }

        await dataStore.deleteAttendance(id)
        res.sendStatus(200);

        next()
    }
    catch (err) {
        next(err)
    }
}
