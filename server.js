const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const restrictedRouter = require("./restrictedRouter");
const unrestrictedRouter = require("./unrestrictedRouter");
const server = express();
const Users = require('./data/userModel');



//middleware

const restricted = (req, res, next) => {
    let {username, password} = req.headers;

    if(username && password) {
        Users.findUsersBy({username})
            .first()
            .then(user => {
                if(password && bcrypt.compareSync(password, user.password)){
                    next();
                }
                else {
                    res.status(401).json({Error: "Invalid credentials"});
                }
            })
            .catch(err => {
                res.status(500).json({Error: err.message});
            })
    } else {
        res.status(403).json({Error: "You don't have permission to access this site without credentials"})
    }
}


//global middleware
server.use(express.json());
server.use(cors({origin: 'http://localhost:3000', credentials:true}));
server.use('/api/vip',restricted, restrictedRouter);
server.use('/api', unrestrictedRouter)


server.get('/', (req, res) => {
    res.send({Success: "sanity check..."})
})
let port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});