import { ErrorHandler } from './errorHandler.js'

export const isObjectExisting = (object) => {
    return Object.keys(object).length > 0;
}

export const displayResponse = (res, event) => {
    if (!isEventExisting(event)) {
        throw new ErrorHandler(404)
    }

    res.send(event);
}

