import OpenRouteService from 'openrouteservice-js';

const Directions = new OpenRouteService.Directions({
    api_key: process.env.TOKEN_ROUTES
});

export const getRoute = async (start, end) => {
    try {
        const result = await Directions.calculate({
            coordinates: [start, end],
            profile: 'driving-car',
            format: 'geojson'
        });
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}