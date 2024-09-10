const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
const users = [];
const JWT_SECRET = "USER_APP";

function auth(req,res,next){
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token,JWT_SECRET,(err, decoded) => {
            if(err){
                res.status(401).send({
                    message:"Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    }else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}
app.get("/", function(req, res) {
    res.sendFile(__dirname+"/public/index.html")
})
app.post('/signup' ,(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username,
        password
    })
    res.send({
        message:"You have signed up"
    })
})
app.post('/signin' ,(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);
  
    if(user){
        const token = jwt.sign({
            username:user.username
        },JWT_SECRET)
        user.token = token;
        res.send({
            token
        })
        
    }else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
})
app.get('/me',auth, (req,res) => {
    const user = req.user;
    res.send({
        username:user.username
    })
})
app.listen(3000, () => console.log('Server is listening on port 3000'))