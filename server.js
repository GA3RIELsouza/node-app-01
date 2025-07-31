const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 3000
const readUsers = () => {
    const data = fs.readFileSync('./users.json')
    return JSON.parse(data)
}
const writeUsers = (users) => {
    fs.writeFileSync('./users.json', JSON.stringify(users))
}

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})

app.get('/', (req, res) => {
    res.send(`Node.JS + Express server running on port ${PORT}.`)
})

app.get('/users', (req, res) => {
    const users = readUsers()
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    const users = readUsers()
    const id = parseInt(req.params.id)
    const user = users.find(a => a.id === id)

    if (user === undefined) {
        res.status(404).json({ message: 'User not found.' })
    }

    res.json(user)
})

app.delete('/users/:id', (req, res) => {
    const users = readUsers()
    const id = parseInt(req.params.id)
    const user = users.find(a => a.id === id)

    if (user === undefined) {
        res.status(404).json({ message: 'User not found.' })
    }

    writeUsers(users.filter(a => a.id !== id))

    res.json(user)
})

app.post('/users', (req, res) => {
    const users = readUsers()
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1
    const user = { id: id, name: req.body.name }
    users.push(user)
    writeUsers(users)

    res.status(201).json(user)
})

app.put('/users/:id', (req, res) => {
    const users = readUsers()
    const id = parseInt(req.params.id)
    const index = users.findIndex(a => a.id === id)

    if (index === -1) {
        res.status(404).json({ message: 'User not found.' })
    }

    const name = req.body.name
    users[0].name = name

    writeUsers(users)

    res.json({ id: id, name: name })
})
