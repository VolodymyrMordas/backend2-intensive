import hash from 'object-hash';

const user = {
    name: {
        first: 'John',
        last:  'Doe',
    },
    emails: [
        {
            email:   'jdoe@example.com',
            primary: true,
        },
    ],
    phones: [
        {
            phone:   '+380662332377',
            primary: true,
        },
    ],
    sex:      'm',
    hash:     '10ba038e-48da-487b-96e8-8d3b99b6d18a',
    roles:    [ 'newbie' ],
    notes:    'ordered react and backend + docker',
    disabled: false,
    social:   {
        facebook: 'http://fb.com/jdoe',
        linkedin: 'http://linkedin.com/jdoe',
        github:   'http://github.com/jdoe',
        skype:    'jdoe',
    },
    created:  '2019-06-18T20:00:03.567Z',
    modified: '2019-06-19T12:04:10.304Z',
};

const users = {
    [ hash(user) ]: user,
};

const getUsers = () => {
    const usrs = [];
    for (const u in users) {
        usrs.push(users[ u ]);
    }

    return usrs;
};

const createUser = (user) => {
    const userHash = hash(user);
    users[ userHash ] = user;

    return userHash;
};

const getUserByHash = (hash) => users[ hash ];

const updateUserByHash = (userHash, user) => users[ userHash ] = user;

const deleteUserByHash = (userHash) => delete users[ userHash ];

export default { getUsers, createUser, getUserByHash, updateUserByHash, deleteUserByHash };
