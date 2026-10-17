const express = require('express');
const route = express.Router();

const Chinese = require('./../models/Chinese');


route.post('/chinese', async(req, res) => {
  try{
    const data = req.body;
    const newDish = new Chinese(data);
    const saveDish = await newDish.save();
    res.status(200).json(saveDish);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'})
  }
});

route.get('/chinese', async(req, res) => {
  try{
    const data = await Chinese.find();
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
});




route.get('/chinese/:spicyType', async (req, res) => {
    try {
        const spicyType = req.params.spicyType;

        if (spicyType === 'less' || spicyType === 'moderate' || spicyType === 'very spicy') {
            const response = await Chinese.find({ Spicy: spicyType });
            console.log('Chinese dishes fetched successfully');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid spicy type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


route.put('/:id', async (req, res) => {
    try {
        const dishId = req.params.id;
        const updatedDishData = req.body;

        const response = await Chinese.findByIdAndUpdate(
            dishId,
            updatedDishData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!response) {
            return res.status(404).json({ error: 'Chinese dish not found' });
        }

        console.log('Chinese dish updated successfully');
        res.status(200).json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = route;