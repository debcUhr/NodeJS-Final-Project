import express from 'express';
import eventsRouter from './routers/eventsRouter.js';
import membersRouter from './routers/membersRouter.js';
import attendanceRouter from './routers/attendanceRouter.js';
import { errorMiddleware } from './middleware/errorMiddleware.js'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'text/html' }));
app.use(express.raw({ type: 'text/xml' }));
app.use(express.json());

app.use('/api/events', eventsRouter);
app.use('/api/members', membersRouter);
app.use('/api/attendance', attendanceRouter);


// middleware
app.use(errorMiddleware)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is now up listening on port ${port}`);
});
