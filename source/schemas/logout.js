export const schemaLogout = {
    type:       'object',
    properties: {
        login: {
            type:      'string',
            minLength: 3,
        },
    },
    required:             [ 'login' ],
    additionalProperties: false,
};