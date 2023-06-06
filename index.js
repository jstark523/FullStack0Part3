const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

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
    response.json(people)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const person = people.find(p => p.id === id)

  if(person){
    response.json(person)
  }
  else{
    return response.status(404).send("not found")
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if(people.find(person => person.name === body.name)){
    return response.status(409).json({
      error: 'name already exists in phonebook'
    })
  }

  const id = Math.random() * 1000

  const person = {
    id: id,
    name: body.name,
    number: body.number
  }

  people = people.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(p => p.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)