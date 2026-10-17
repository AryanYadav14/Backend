const express = require('express');
const route = express.Router();

const Person = require('./../models/Person');

route.get('/person', async (req, res) => {
    try {
        const data = await Person.find();

        console.log('Person data fetched successfully');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching person data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

route.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();

        console.log('Person data saved successfully');
        res.status(200).json(savedPerson);
    } catch (err) {
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



route.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter

        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ role: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


route.put('/person/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(
            personId,
            updatedPersonData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Person data updated successfully');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = route;