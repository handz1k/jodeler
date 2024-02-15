const express = require('express')
const cors = require('cors')
const app = express()
const Jodel = require('./models/jodel')

require('express-async-errors')

app.use(cors())
app.use(express.json())


app.get('/jodel', async (req, res) => {
  const jodels = await Jodel.find({})
  res.json(jodels)
})

app.post('/jodel', async (req, res) => {
  const body = req.body
  const newJodel = new Jodel({
    content: body.content,
  })
  const savedJodel = await newJodel.save()
  res.status(201).json(savedJodel)
  })


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(5001, () => {
  console.log('listening on port 5001')
})

