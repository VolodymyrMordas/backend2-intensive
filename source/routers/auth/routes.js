export const login = ({ headers: { authorization } }, res) => {
    if (!authorization) {
        return res.status(400).json({
            message: 'incorrect payload',
        });
    }

    const decoded = Buffer.from(authorization, 'base64')
        .toString('utf-8');

    if (!decoded.includes(':')) {
        return res.status(400).json({
            message: 'incorrect payload',
        });
    }

    return res.sendStatus(204);
};

export const logout = (req, res) => {
    try {
        const { login } = req.body;

        return res.sendStatus(204);
    } catch (error) {
        return res.status(401).json({message: error.message});
    }
};
