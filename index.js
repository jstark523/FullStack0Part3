require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')


app.use(cors())

app.use(express.json())

app.use(express.static('build'))

morgan.token('req-body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms :req-body'))

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const currentTime = new Date().toString()
  response.write(`<p>Phonebook has info for ${people.length} people</p>`)
  response.write(`<p>${currentTime}</p>`)
  response.send()
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people =>{
      response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(Number(request.params.id)).then(person =>{
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson =>{
    response.json(savedPerson)
  })

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(p => p.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)