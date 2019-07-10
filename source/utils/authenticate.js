// Instruments
import { getPassword } from './env';
import querystring from 'querystring';

const password = getPassword();

export const authenticate = (req, res, next) => {
    const { cookie } = req.headers;
    const { email } = querystring.parse(cookie);
    
    if (email) {
        next();
    } else {
        res.status(401).json({ message: 'authentication issue here. seems that u have forget to set cookies' });
    }
};
