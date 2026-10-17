const mongoose = require('mongoose');

const personschema = new mongoose.Schema({
    name: {
         type: String,
          required: true 
        },
    age: {
         type: Number 
        },
    role: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
         type: String,
          required: true,
          unique: true 
        },
    email: { 
        type: String,
         unique: true 
    },
    address: {
         type: String,
         required: true 
        },
    salary: {
         type: Number
         }
});

const Person = mongoose.model('Person', personschema);

module.exports = Person;