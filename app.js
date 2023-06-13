require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./server/config/db");
const router = require("./server/routes/userRoute");
const moviesRoutes = require('./server/routes/MoviesRoutes')
const port = 3000 || process.env.PORT;

connectDB()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse `multipart/form-data` bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    // console.log("heloooo");
    next();
});
app.use("/moveminia", router);
app.use("/moveminia", moviesRoutes);


app.listen(port, () => {
    console.log(`App listeing on port ${port}`);
});
