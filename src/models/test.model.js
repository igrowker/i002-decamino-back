import mongoose from 'mongoose'

// Definicion del schema "test"
const testSchema = new mongoose.Schema({
  // Contendrá una propiedad "value" cuyo tipo será un string, será requerida y por defecto dirá "empty"
  value: {
    type: String,
    required: true,
    default: "empty"
  }
})

// Se crea el modelo a partir del schema ya definido
const TestModel = mongoose.model('Test', testSchema)

// Exportación para poder llamarlo y utilizar sus métodos (find, findById, create, etc)
export default TestModel