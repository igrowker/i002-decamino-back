export default function notFoundHandler(req, res) {
  return res.status(404).json({
    status: 404,
    messsage: "Endpoint no encontrado",
    from: req.method + ': ' + req.url
  })
}