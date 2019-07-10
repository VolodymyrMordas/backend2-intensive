import express from 'express';

// Instruments
import { app } from './server';
import { getPort } from './utils';
import { logger, password} from './middleware';

// Routers
import {auth, classes, lessons, users} from './routers';

const PORT = getPort();

app.use(express.json({ limit: '10kb' }));


// logger middleware
app.use(logger);

app.use('/', auth);
app.use('/users', users);
app.use('/classes', classes);
app.use('/lessons', lessons);

app.listen(PORT, () => {
    console.log(`Server API is up on port ${PORT}`);
});

// process.on('unhandledRejection', (reason, p) => {
//     console.log('ξ * reason', reason);
// });

