import MembersDataStore from '../dataAccess/membersDataStore.js';
import Validator from 'validatorjs';
import { ErrorHandler } from '../helpers/errorHandler.js'
import { isObjectExisting, displayResponse } from '../helpers/validators.js'
import { hasEventAttendanceErr } from '../helpers/customerErrorMessages.js'


export const getAllMembers = async (req, res, next) => {
    try {
        const dataStore = new MembersDataStore()
        const members = await dataStore.getAllMembers();

        res.send(members);

        next()
    }
    catch (err) {
        next(err)
    }

}

export const getByMemberID = async (req, res, next) => {
    try {
        if (req.params.id !== "search") {
            const dataStore = new MembersDataStore()
            const { id } = req.params;

            const members = await dataStore.getByMemberID(id);

            if (!isObjectExisting(members)) {
                throw new ErrorHandler(404)
            }

            res.send(members);

            next()
        }
    }
    catch (err) {
        next(err)
    }
}

export const searchMembers = async (req, res, next) => {
    try {
        const dataStore = new MembersDataStore()
        const { name, status } = req.query;

        const members = await dataStore.searchMember(name, status);

        if (!isObjectExisting(members)) {
            throw new ErrorHandler(404)
        }

        res.send(members);

        next()
    }
    catch (err) {
        next(err)
    }
}

export const createMember = async (req, res, next) => {
    try {
        const dataStore = new MembersDataStore();
        const { name, joinedDate, status } = req.body;

        const saerchMember = await dataStore.searchMember(name, status);

        const rules = {
            name: 'required|string',
            joinedDate: 'date',
            status: 'required|string'
        }
        const validation = new Validator(req.body, rules);


        if (isObjectExisting(saerchMember)) {
            throw new ErrorHandler(409)
        }
        else if (validation.fails() || !(status == "Active" || status == "In-active")) {
            throw new ErrorHandler(400)
        }

        await dataStore.insertMember(req.body)
        res.sendStatus(201)

        next()
    }
    catch (err) {
        next(err)
    }
}

export const updateMember = async (req, res, next) => {
    try {
        const dataStore = new MembersDataStore();
        const { memberID, name, joinedDate, status } = req.body;

        const saerchMember = await dataStore.searchMember(name, status);
        const detailsByID = await dataStore.getByMemberID(memberID);

        const rules = {
            memberID: 'required|integer',
            name: 'required|string',
            status: 'required|string'
        }

        const validation = new Validator(req.body, rules);

        if (!isObjectExisting(detailsByID)) {
            throw new ErrorHandler(404)
        }
        else if (validation.fails() || !(status == "Active" || status == "In-active")) {
            throw new ErrorHandler(400)
        }
        else if (isObjectExisting(saerchMember)) {
            throw new ErrorHandler(409)
        }

        await dataStore.updateMember(req.body)
        res.sendStatus(200);

        next()
    }
    catch (err) {
        next(err)
    }

}

export const deleteMember = async (req, res, next) => {
    try {
        const dataStore = new MembersDataStore();
        const { id } = req.params;

        const detailsByID = await dataStore.getByMemberID(id);

        if (!isObjectExisting(detailsByID)) {
            throw new ErrorHandler(404)
        }
        else if (detailsByID[0].EventName) {
            throw new ErrorHandler(400, hasEventAttendanceErr)
        }

        await dataStore.deleteMember(id)
        res.sendStatus(200);

        next()
    }
    catch (err) {
        next(err)
    }
}
