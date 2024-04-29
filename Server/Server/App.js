// express-server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://21bd1a660vcsma:Qs1c4N5fEOpFydjG@cluster0.ncqey75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define counter schema and model
const counterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
    mycount: { type: Number, default: 0 }
},{ collection: 'counters' });
const Counter = mongoose.model('Counter', counterSchema);

// Routes for count
app.get('/api/counter', async (req, res) => {
    try {
        const counter = await Counter.findOne();
        res.json({ count: counter.count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/increment', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.count++;
        await counter.save();
        console.log('Count variable updated successfully');
        res.send('Count variable updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/decrement', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.count--;
        await counter.save();
        console.log('Count variable decremented successfully');
        res.send('Count variable decremented successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Routes for mycount
app.get('/api/mycount', async (req, res) => {
    try {
        const counter = await Counter.findOne();
        res.json({ mycount: counter.mycount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/mycount/increment', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.mycount++;
        await counter.save();
        console.log('MyCount variable updated successfully');
        res.send('MyCount variable updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/mycount/decrement', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.mycount--;
        await counter.save();
        console.log('MyCount variable decremented successfully');
        res.send('MyCount variable decremented successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
Counter.findOne()
    .then(counter => {
        if (!counter) {
            const newCounter = new Counter({ count: 0, mycount: 0 });
            return newCounter.save();
        }
    })
    .catch(err => console.error('Error seeding database:', err));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.send('Server is running.');
});
