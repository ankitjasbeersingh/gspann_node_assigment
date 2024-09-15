const authService = require('../services/authService');

const signUp = async (req,res) => {
    const {username,password} = req.body;
    const hashedPassword = await authService.hashedPassword(password);
    authService.addUser({username, password:hashedPassword});
    res.send({message:"You have signed up"});
};

const signIn = async (req,res) => {
    const {username,password} = req.body;
    
    const user = authService.findUser(username);
    if(user && await authService.comparePassword(password,user.password)){
        const token = authService.createToken(user);
        res.send({token});
    }else{
        res.status(403).send({message: "Invalid username or password"});
    }
};

const getMe = async (req,res) => {
    console.log('HelLo');
    const token = req.headers.authorization;
    if(token){
        try{
            const decoded = await authService.verifyToken(token);
            res.send({username:decoded.username});
        } catch(error){
            res.status(401).send({message:error});
        }
    }else{
        res.status(401).send({message:"Unauthorized"});
    }
};
module.exports ={
    signUp,
    signIn,
    getMe
}