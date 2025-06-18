const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/AuthRouter');
const noteRouter = require('./Routes/Notes');

const app = express();
require('dotenv').config();
require('./models/db');

// Middleware
app.use(bodyParser.json());

//cors error handle

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));


// Routes
app.use('/auth', authRouter);
app.use('/note', noteRouter);

app.get("/demo",(req,res)=>{
    res.send("this is from backend side ");
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server running on the Port:", PORT);
});
