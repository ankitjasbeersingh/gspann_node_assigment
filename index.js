const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/public/index.html")
});
app.use('/auth', authRoutes);

app.listen(3000, () => console.log('Server is listening on port 3000'))