import usersRepository from '../users.repository';

export const getByHash = (req, res) => {
    try {
        const { userHash } = req.params;
        const data = usersRepository.getUserByHash(userHash);
        res.status(200)
            .json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const userUpdate = (req, res) => {
    try {
        const { userHash } = req.params;
        const user = req.body;

        const data = usersRepository.updateUserByHash(
            userHash, user,
        );

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const userDelete = (req, res) => {
    try {
        const { userHash } = req.params;

        if (!userHash) {
            return res.sendStatus(400);
        }

        usersRepository.deleteUserByHash(userHash);

        return res.sendStatus(204);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

