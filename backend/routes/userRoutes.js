import User from '../models/User.js';

const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find({})
        console.log('allusers', allUser)
        res.status(201).json({ message: allUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' });
    }
}

const getSingleUser = async (req, res) => {
    const { username } = req.params
    console.log('username', username)

    try {
        const user = await User.findById({username})
        console.log('allusers', user)
        res.status(201).json({ message: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' });
    }
}


export { getAllUsers, getSingleUser }





// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Adjust path to your User model

// // router.post('/add', async (req, res) => {
// //     const { username, name, age } = req.body; // Extract fields from request body
// //     try {
// //         const newUser = new User({ username, name, age }); // Pass all fields to the model
// //         await newUser.save(); // Save to the database
// //         res.status(201).json({ message: 'User added successfully', user: newUser });
// //     } catch (error) {
// //         console.error('Error adding user:', error);
// //         res.status(500).json({ message: 'Server error' });
// //     }
// // });
// // Fetch user details by username


// const getAllUsers = async (req, res) => {
//     try {
//         const allUser = await User.find({})
//         console.log('allusers', allUser)
//         res.status(201).json({ message: allUser });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error retrieving user' });
//     }
// }

// // router.get('/getAllUsers', async (req, res) => {
// //     try {
// //        const allUser = await User.find({})
// //        console.log('allusers', allUser)
// //         res.status(201).json({ message: allUser });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Error retrieving user' });
// //     }
// // });

// module.exports = router;
