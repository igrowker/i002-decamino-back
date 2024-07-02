import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
    value: {
      type: String,
      required: true,
      default: "empty"
    }
})

const TestModel = mongoose.model('Test', testSchema)

export default TestModel