import { getRoute } from '../services/route.service.js';
import { routeSchema } from '../schemas/route.schema.js';
import CustomError from '../utils/custom.error.js'

export const getRouteController = async (req, res, next) => {
  try {
    const { start, end } = req.query

    const { error, value } = routeSchema.validate({ start, end });

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const { start: startCoords, end: endCoords } = value;

    const route = await getRoute(startCoords, endCoords);

    const routeSummary = {
      distance: route.features[0].properties.segments[0].distance,
      duration: route.features[0].properties.segments[0].duration,
      start: route.features[0].geometry.coordinates[0],
      end: route.features[0].geometry.coordinates.slice(-1)[0]
    };

    res.status(200).json(routeSummary)
  } catch (error) {
    next(error)
  }
};