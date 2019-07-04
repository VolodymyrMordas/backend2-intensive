export const logger = ({ url, method, params }, { statusCode }, next) => {
    console.log('Time:', new Date(), statusCode, method, url, params);
    next();
};
