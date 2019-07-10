export const password = (req, res, next) => {
    const authorization = req.header('Authorization');
    
    console.log('ξ * ->', authorization, process.env.PASSWORD);
    if (process.env.PASSWORD !== authorization) {
        return res.sendStatus(401);
    }

    next();
};
