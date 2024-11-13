const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/createTask');  // Ensure this path is correct
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost:27017/journal', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000  // Increased timeout to 5 seconds
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});
app.get('/createTask', (req, res) => {
    res.sendFile(path.join(__dirname, './task.html'));
});

// Create Task
// app.post('/submit', async (req, res) => {
    //     const { title, description, due, reminder } = req.body;
    //     const newTask = new Task({
        //         title,
//         description,
//         dueDate: new Date(due),
//         reminderDate: new Date(reminder)
//     });

//     try {
    //         await newTask.save();
    //         res.send('Task saved successfully!');
    //     } catch (error) {
        //         res.status(500).send('Error saving task: ' + error.message);
        //     }
        // });
        
    // Create Task
app.post('/tasks', async (req, res) => {
    const { title, description, due, reminder } = req.body;
    const newTask = new Task({
        title,
        description,
        dueDate: new Date(due),
        reminderDate: new Date(reminder)
    });

    try {
        await newTask.save();
        res.send('Task saved successfully!');
    } catch (error) {
        res.status(500).send('Error saving task: ' + error.message);
    }
});

// Read Tasks
// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.send(tasks);
//     } catch (error) {
//         res.status(500).send('Error retrieving tasks: ' + error.message);
//     }
// });

// Read Tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        res.status(500).send('Error retrieving tasks: ' + error.message);
    }
});


// Update Task
    // app.put('/tasks/:id', async (req, res) => {
    //     const { id } = req.params;
    //     const updatedTask = {
    //         title: req.body.title,
    //         description: req.body.description,
    //         dueDate: new Date(req.body.due),
    //         reminderDate: new Date(req.body.reminder)
    //     };

    //     try {
    //         const result = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
    //         res.send(result);
    //     } catch (error) {
    //         res.status(500).send('Error updating task: ' + error.message);
    //     }
    // });

    // Update Task
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = {
        title: req.body.title,
        description: req.body.description,
        dueDate: new Date(req.body.due),
        reminderDate: new Date(req.body.reminder)
    };

    try {
        const result = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
        res.send(result);
    } catch (error) {
        res.status(500).send('Error updating task: ' + error.message);
    }
});

// // Delete Task
// app.delete('/tasks/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         await Task.findByIdAndDelete(id);
//         res.send('Task deleted');
//     } catch (error) {
//         res.status(500).send('Error deleting task: ' + error.message);
//     }
// });

// Delete Task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Task.findByIdAndDelete(id);
        res.send('Task deleted');
    } catch (error) {
        res.status(500).send('Error deleting task: ' + error.message);
    }
});

// // Update Task Status to Completed 
// app.put('/tasks/:id/complete', async (req, res) => { 
//     const { id } = req.params; 
//     try { const result = await Task.findByIdAndUpdate(id, { completed: true }, { new: true }); 
//     res.send(result); 
//     } 
//     catch (error) {
//          res.status(500).send('Error completing task: ' + error.message); 
//         } 
//     });
   
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// Update Task Status to Completed 
app.put('/tasks/:id/complete', async (req, res) => { 
    const { id } = req.params; 
    try { 
        const result = await Task.findByIdAndUpdate(id, { completed: true }, { new: true }); 
        res.send(result); 
    } catch (error) {
        res.status(500).send('Error completing task: ' + error.message); 
    } 
});

module.exports.handler = serverless(app);
