const express = require("express");
const router = express.Router();
const User = require('./data/userModel');


const findUsers = (req, res) => {
    //check for token/session
    User.findUsers()
        .then(user => {
            res.status(200).json(user);
        })
}


router.route('/')
    .get(findUsers)

module.exports = router;
