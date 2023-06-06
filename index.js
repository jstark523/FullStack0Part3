const express = require('express')
const app = express()

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

  person = people.find(p => p.id === id)

  if(person){
    response.json(person)
  }
  else{
    return response.status(404).send("not found")
  }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)