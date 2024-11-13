const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    dueDate: { type: Date, required: true },
    reminderDate: { type: Date, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
