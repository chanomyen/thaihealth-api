const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
];

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a user by id
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: `User with id ${id} not found` });
    }
});

// Create a new user
app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.status(201).json(user);
});

// Update a user by id
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { id, ...req.body };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: `User with id ${id} not found` });
    }
});

// Delete a user by id
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ message: `User with id ${id} not found` });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
