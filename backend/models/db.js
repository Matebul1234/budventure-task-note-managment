const mongoose = require('mongoose');

const mongo_url = process.env.MONGODB_CONECTION;
mongoose.connect(mongo_url)
    .then(() => {
        console.log("mongo db connected")
    })
    .catch((err) => {
        console.log("mongo connection Error :", err);
    })