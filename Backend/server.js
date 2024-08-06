const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth.js"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));