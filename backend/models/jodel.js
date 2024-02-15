const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {console.log('connected to mongoDB')})
  .catch((error) => {
    console.log('error connecting to MongoDB',error.message)})

const jodelSchema = new mongoose.Schema({
  content: String
})

jodelSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Jodel', jodelSchema)
