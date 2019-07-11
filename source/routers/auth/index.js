// Core
import express from 'express';
import passport from 'passport';


// Instruments
import { login, logout, logoutJwt } from './route';
import { limiter, authenticate } from '../../utils';
import {getPassword} from '../../utils/env';
import * as jwt from 'jsonwebtoken';

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

export const router = express.Router();

// todo: for test -> https://www.getpostman.com/collections/821f1b99a9640278eb44
const opts = {
    jwtFromRequest:   ExtractJwt.fromHeader('x-token'),
    secretOrKey:      getPassword(),
    ignoreExpiration: true,
};

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    const { email } = jwtPayload;
    if (email === 'volodymyrmordas@gmail.com') {
        return done(null, true);
    }

    return done(null, false);
}));

router.post('/login', [ limiter(5, 60 * 1000) ], login);
router.post('/logout', [ authenticate, limiter(5, 60 * 1000) ], logout);

router.post('/auth/login', async (req, res) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ message: 'no auth header' });
    }

    const [ type, credentials ] = auth.split(' ');
    const [ email, password ] = Buffer.from(credentials, 'base64')
        .toString()
        .split(':');

    if (password === getPassword()) {
        const token = await jwt.sign({
            email,
        }, getPassword());

        res.setHeader('X-Token', token);

        return res.sendStatus(201);
    }

    return res.sendStatus(401);
});


router.post('/auth/test',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.sendStatus(201);
    });

export { router as auth };
