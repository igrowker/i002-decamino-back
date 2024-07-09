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
        console.error('Error fetching route:', error.message);
        throw new Error(error.message);
    }
}