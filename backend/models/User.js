const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true }, // Add 'name' field
    age: { type: Number, required: true },  // Add 'age' field
});

module.exports = mongoose.model('User', userSchema);
