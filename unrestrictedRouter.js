const express = require("express");
const bcrypt = require('bcrypt');
const User = require("./data/userModel");
const router = express.Router();

const register = (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    User.insert(user)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({err: err.message})
        })
}

const login = (req, res) => {
    const { username, guess } = req.body;
    User.findUsersBy({username})
        .first()
        .then(user => {
            if(guess && bcrypt.compareSync(guess, user.password)) {
                res.status(200).json({message: `Welcome ${user.username}!`})
            } else {
                res.status(401).json({message: "invalid credentials"});
            }

        })
        .catch(err => {
            res.status(500).json({error: err.message});
        })
}

router.route('/register')
    .post(register);
router.route('/login')
    .post(login);




module.exports = router;