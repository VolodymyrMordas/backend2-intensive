import usersRepository from './users.repository';

export const get = (req, res) => {
    try {
        const data = usersRepository.getUsers();

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const post = (req, res) => {
    try {
        const hash = usersRepository.createUser(req.body);

        return res.status(201).json({ hash });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
