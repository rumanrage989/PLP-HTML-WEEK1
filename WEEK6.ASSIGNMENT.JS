const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        // Create a session or JWT
        req.session.userId = user._id; // For session-based auth
        res.send('Logged in');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

module.exports = router;
<!-- login.html -->
<form id="login-form">
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Login</button>
</form>

<script>
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (response.ok) {
        // Redirect to dashboard
        window.location.href = '/dashboard';
    } else {
        alert('Login failed');
    }
});
</script>
router.get('/transactions', async (req, res) => {
    if (!req.session.userId) return res.status(401).send('Unauthorized');
    const transactions = await Transaction.find({ userId: req.session.userId });
    res.json(transactions);
});
<!-- dashboard.html -->
<div id="transaction-list"></div>

<script>
async function fetchTransactions() {
    const response = await fetch('/transactions');
    const transactions = await response.json();
    
    const transactionList = document.getElementById('transaction-list');
    transactions.forEach(transaction => {
        const item = document.createElement('div');
        item.textContent = ${transaction.date}: ${transaction.amount} - ${transaction.description};
        transactionList.appendChild(item);
    });
}

fetchTransactions();
</script>
router.post('/register', async (req, res) => {
    try {
        // Registration logic
    } catch (error) {
        res.status(500).send('Server error');
    }
});
const validateInput = (data) => {
    // Basic validation logic (e.g., check for empty fields)
    return data.username && data.password;
};

document.getElementById('login-form').addEventListener('submit', async (e) => {
    // Validate data here
});
