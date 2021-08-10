import express from 'express'
import * as eventsController from '../controllers/eventsController.js';
import { Logger } from '../middleware/httpLogger.js'
import { formatHttpLog } from '../helpers/formatHelper.js'

const eventsRouter = express.Router();

eventsRouter.get('/search', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Events"));
    eventsController.searchEvents(req, res, next);
})

eventsRouter.get('/export', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Events"));
    eventsController.exportEvent(req, res, next)
});

eventsRouter.get('/', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Events"));
    eventsController.getAllEvents(req, res, next)
});

eventsRouter.get('/:id', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Events"));
    eventsController.getDetailsByEventID(req, res, next)

});


eventsRouter.post('/', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Events"));
    eventsController.createEvent(req, res, next)
});

eventsRouter.put('/', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Events"));
    eventsController.updateEvent(req, res, next)
});


eventsRouter.delete('/:id', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Events"));
    eventsController.deleteEvent(req, res, next)
});

export default eventsRouter;