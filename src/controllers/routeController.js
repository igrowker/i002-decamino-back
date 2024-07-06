import { getRoute } from '../services/routeService.js';

export const getRouteController = async (req, res) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) {
            return res.status(400).json({ error: 'Start and end coordinates are required' });
        }

        const startCoords = JSON.parse(start);
        const endCoords = JSON.parse(end);

        const route = await getRoute(startCoords, endCoords);
        res.json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};