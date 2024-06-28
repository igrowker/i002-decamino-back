export default function (req, res, next) {
    try {
        return res.status(404).json({
            status: 404,
            messsage: "Endpoint no encontrado",
            from: req.method + ': ' + req.url
        })
    }
    catch(error) {
        next(error)
    }
}