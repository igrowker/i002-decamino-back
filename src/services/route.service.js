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
  }
  catch (error) {
    console.error('Error fetching route:', error.message);
    throw error
  }
}

export const deleteRoute = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRoute = await Route.findByIdAndDelete(id);

    if (!deletedRoute) {
      return CustomError.new({ status: 404, message: 'Ruta no encontrada' });
    }

    return res.status(200).json({ message: 'Ruta eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
}