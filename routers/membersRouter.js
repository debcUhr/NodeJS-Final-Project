import express from 'express'
import * as membersController from '../controllers/membersController.js';
import { Logger } from '../middleware/httpLogger.js'
import { formatHttpLog } from '../helpers/formatHelper.js'

const membersRouter = express.Router();

membersRouter.get('/search', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Members"));
    membersController.searchMembers(req, res, next)
});

membersRouter.get('/', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Members"));
    membersController.getAllMembers(req, res, next)
});
membersRouter.get('/:id', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Members"));
    membersController.getByMemberID(req, res, next)
});


membersRouter.post('/', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Members"));
    membersController.createMember(req, res, next)
});

membersRouter.put('/', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Members"));
    membersController.updateMember(req, res, next)
});


membersRouter.delete('/:id', (req, res, next) => {
    Logger.info(formatHttpLog(req, "Members"));
    membersController.deleteMember(req, res, next)
});

export default membersRouter;