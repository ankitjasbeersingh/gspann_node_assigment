const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "USER_APP";
const userModel = require('../models/userModel')

const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
}

const comparePassword= async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}

const createToken = (user) => {
    return jwt.sign({username:user.username}, JWT_SECRET);
}
const verifyToken = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,JWT_SECRET, (err, decoded) => {
            if(err){
                reject("Unauthorized");
            } else {
                resolve(decoded);
            }
        });
    });
}
const findUser = (username) => userModel.findUserByUsername(username);

const addUser = (user) => userModel.addUser(user);

module.exports = {
    hashedPassword,
    comparePassword,
    createToken,
    verifyToken,
    findUser,
    addUser
}