require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./server/config/db");
const router = require("./server/routes/userRoute");
const moviesRoutes = require('./server/routes/MoviesRoutes')
const dramaRoutes = require('./server/routes/DramaRoutes')
const sliderRoutes = require('./server/routes/SliderRoutes')
const feedbackRoutes = require('./server/routes/FeedbackRoutes')
const port = 3000 || process.env.PORT;
connectDB()
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use((req, res, next) => {
    next();
});
app.use("/moveminia", router);
app.use("/moveminia", moviesRoutes);
app.use("/moveminia", dramaRoutes);
app.use("/moveminia", sliderRoutes);
app.use("/moveminia", feedbackRoutes);
app.listen(port, () => {
    console.log(`App listeing on port ${port}`);
});
