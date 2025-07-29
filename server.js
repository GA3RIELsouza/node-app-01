const express = require('express');

const app = express();
const port = 3000;

let users = [
    { id: 1, name: 'Celso' },
    { id: 2, name: 'Maria' },
    { id: 3, name: 'Carlos' },
    { id: 4, name: 'Ana Paula' }
];

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

app.get('/', (req, res) => {
    res.send(`Node.JS + Express server running on port ${port}.`);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(a => a.id === id);

    if (user === undefined) {
        res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(a => a.id === id);

    if (user === undefined) {
        res.status(404).json({ message: 'User not found.' });
    }

    users = users.filter(a => a.id !== id);

    res.json(user);
});

app.post('/users', (req, res) => {
    const user = { id: users.length + 1, name: req.body.name };
    users.push(user);

    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(a => a.id === id);

    if (index === -1) {
        res.status(404).json({ message: 'User not found.' });
    }

    const name = req.body.name;
    users[0].name = name;

    res.json({ id: id, name: name });
});
