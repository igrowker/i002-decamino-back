import Test from '../models/Test.js'

export const GETTest = async (req, res) => {
  try {
    const response = await Test.find()
    return res.json({ status: 'success', payload: response })
  }
  catch (e) {
    return res.status(500).json({ status: 'error', message: e.message })
  }
}

export const POSTTest = async (req, res) => {
  const data = req.body
  try {
    const response = await Test.create(data)
    return res.json({ status: 'success', payload: response })
  }
  catch (e) {
    return res.status(500).json({ status: 'error', message: e.message })
  }
}

export const PUTTest = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const response = await Test.findByIdAndUpdate(id, data, { new: true })
    return res.json({ status: 'success', payload: response })
  }
  catch (e) {
    return res.status(500).json({ status: 'error', message: e.message })
  }
}

export const DELETETest = async (req, res) => {
  const { id } = req.params
  try {
    const response = await Test.findByIdAndDelete(id)
    return res.json({ status: 'success', payload: response })
  }
  catch (e) {
    return res.status(500).json({ status: 'error', message: e.message })
  }
}