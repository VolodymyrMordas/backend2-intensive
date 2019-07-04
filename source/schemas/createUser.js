export const createUser = {
    type:       'object',
    properties: {
        name: {
            type:      'string',
            minLength: 3,
        },
        email: {
            type:   'string',
            format: 'email',
        },
        phone: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        sex: {
            enum: [ 'm', 'f' ],
        },
        role: {
            type: 'string',
        },
    },
    required:             [ 'name', 'email', 'phone', 'password', 'sex' ],
    additionalProperties: false,
};
