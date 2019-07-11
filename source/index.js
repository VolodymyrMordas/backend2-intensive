import express from 'express';
import dg from 'debug';
import passport from 'passport';

// Instruments
import { app } from './server';
import { getPort, logger } from './utils';

// Routers
import { auth, users, classes, lessons } from './routers';

import GitHubStrategy from 'passport-github2';

const debug = dg('server:main');
const PORT = getPort();

app.use(express.json({ limit: '10kb' }));
app.use(passport.initialize());

passport.use(new GitHubStrategy({
    clientID:     'Iv1.628027178356991d',
    clientSecret: '0ee26c656b435435b7b029266a56d8e9c4aab17c',
    callbackURL:  'http://127.0.0.1:3000/api/users',
},
(accessToken, refreshToken, profile, done) => {
    console.log('ξ * ', profile);
    done(profile, true);
}));

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

// Routers
app.use('/api', auth);
app.use('/api/users', users);
app.use('/api/classes', classes);
app.use('/api/lessons', lessons);

app.listen(PORT, () => {
    debug(`Server API is up on port ${PORT}`);
});
