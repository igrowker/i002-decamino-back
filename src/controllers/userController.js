import User from '../models/User.js';

export const createUser = async (req, res) => {
    const request = req.body;
    try {
        const response = await User.create(request);
        return res.status(201).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}