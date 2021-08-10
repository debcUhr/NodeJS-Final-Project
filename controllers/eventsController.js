import EventsDataStore from '../dataAccess/eventsDataStore.js';
import Validator from 'validatorjs';
import { ErrorHandler } from '../helpers/errorHandler.js'
import { isObjectExisting } from '../helpers/validators.js'
import XLSX from 'xlsx'
import moment from 'moment'

export const getAllEvents = async (req, res, next) => {
    try {
        const dataStore = new EventsDataStore()
        const events = await dataStore.getAllEvents();

        res.send(events);

        next()
    }
    catch (err) {
        next(err)
    }

}

export const getDetailsByEventID = async (req, res, next) => {
    try {
        if (!(req.path == "/search" || req.path == "/export")) {
            const dataStore = new EventsDataStore()
            const { id } = req.params;

            const event = await dataStore.getByEventID(id);

            if (!isObjectExisting(event)) {
                throw new ErrorHandler(404)
            }

            res.send(event);

            next()
        }
    }
    catch (err) {
        next(err)
    }
}

export const searchEvents = async (req, res, next) => {
    try {
        const dataStore = new EventsDataStore()
        const { eventname, datestart, dateend } = req.query;

        const event = await dataStore.searchEvent(eventname, datestart, dateend);

        if (!isObjectExisting(event)) {
            throw new ErrorHandler(404)
        }

        res.send(event);

        next()
    }
    catch (err) {
        next(err)
    }
}


export const exportEvent = async (req, res, next) => {
    try {
        const dataStore = new EventsDataStore()
        const eventID = req.query.eventId;

        const eventDetails = await dataStore.getByEventID(eventID)
        const memberAttendance = await dataStore.getMemberAttendanceByID(eventID);

        if (!isObjectExisting(eventDetails)) {
            throw new ErrorHandler(404)
        }

        await processData(eventDetails, memberAttendance);
        res.send(memberAttendance);

        next()
    }
    catch (err) {
        next(err)
    }
}

const processData = async (eventDetails, memberAttendance) => {
    const eventName = eventDetails[0].EventName
    const eventDate = moment(eventDetails[0].StartDateTime).format('YYYY-MM-DD')
    const filename = `${eventName}_ ${eventDate}`
    const fileExtension = '.xlsx';

    const worksheet = XLSX.utils.json_to_sheet(memberAttendance);
    const workbook = { Sheets: { MemberAttendance: worksheet }, SheetNames: ['MemberAttendance'] };

    XLSX.writeFile(workbook, filename + fileExtension);
}

export const createEvent = async (req, res, next) => {
    try {
        const dataStore = new EventsDataStore();
        const { eventType, eventName, startDateTime, endDateTime } = req.body;

        const event = await dataStore.searchEvent(eventName, startDateTime, endDateTime);

        const rules = {
            eventType: 'required|string',
            eventName: 'required|string',
            startDateTime: 'required|date',
            endDateTime: 'required|date|after:startDateTime'
        }

        const validation = new Validator(req.body, rules);

        if (isObjectExisting(event)) {
            throw new ErrorHandler(409)
        }
        else if (validation.fails()) {
            throw new ErrorHandler(400)
        }

        await dataStore.insertEvent(req.body)
        res.sendStatus(201)

        next()
    }
    catch (err) {
        next(err)
    }
}

export const updateEvent = async (req, res, next) => {
    try {
        const dataStore = new EventsDataStore();
        const { eventID, eventType, eventName, startDateTime, endDateTime } = req.body;

        const seacrhEvents = await dataStore.searchEvent(eventName, startDateTime, endDateTime);
        const detailsByID = await dataStore.getByEventID(eventID);

        const rules = {
            eventID: 'required|integer',
            eventType: 'required|string',
            eventName: 'required|string',
            startDateTime: 'required|date',
            endDateTime: 'required|date|after:startDateTime'
        };

        const validation = new Validator(req.body, rules);

        if (!isObjectExisting(detailsByID)) {
            throw new ErrorHandler(404)
        }
        else if (validation.fails()) {
            throw new ErrorHandler(400)
        }
        else if (isObjectExisting(seacrhEvents)) {
            throw new ErrorHandler(409)
        }

        await dataStore.updateEvent(req.body)
        res.sendStatus(200);

        next()
    }
    catch (err) {
        next(err)
    }

}

export const deleteEvent = async (req, res, next) => {
    try {
        const dataStore = new EventsDataStore();
        const { id } = req.params;

        const detailsByID = await dataStore.getByEventID(id);

        if (!isObjectExisting(detailsByID)) {
            throw new ErrorHandler(404)
        }

        await dataStore.deleteEvent(id)
        res.sendStatus(200);

        next()
    }
    catch (err) {
        next(err)
    }
}
