import express from 'express';
import dg from 'debug';
import session from 'express-session';


// Instruments
import { app } from './server';
import { getPort, logger } from './utils';

// Routers
import { auth, users, classes, lessons } from './routers';
import {getPassword} from './utils/env';

const debug = dg('server:main');
const PORT = getPort();

app.use(express.json({ limit: '10kb' }));

// Logger
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        let body = null;

        if (req.method !== 'GET') {
            body = JSON.stringify(req.body, null, 2);
        }

        logger.debug(`${req.method} ${body ? `\n${body}` : ''}`);
        next();
    });
}

app.use(session({
    key:               'user',
    secret:            getPassword(),
    resave:            false,
    rolling:           true,
    saveUninitialized: false,
    cookie:            {
        httpOnly: true,
        maxAge:   15 * 60 * 1000 },
}));

// Routers
app.use('/api', auth);
app.use('/api/users', users);
app.use('/api/classes', classes);
app.use('/api/lessons', lessons);

app.listen(PORT, () => {
    debug(`Server API is up on port ${PORT}`);
});
