const users = [];

module.exports={
    getUsers:() => users,
    addUser: (user) => users.push(user),
    findUserByUsername:(username)=> users.find(user=> user.username === username)
}