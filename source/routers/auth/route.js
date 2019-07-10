import dg from 'debug';

const debug = dg('router:auth');

export const login = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const loginCookies = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);
    const {
        authorization,
    } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'no auth header' });
    }

    const [ type, credentials ] = authorization.split(' ');
    const [ email, password ] = Buffer.from(credentials, 'base64')
        .toString()
        .split(':');

    res.cookie('email', email, {
        httpOnly: true,
        maxAge:   60000,
    });

    res.sendStatus(204);
};
