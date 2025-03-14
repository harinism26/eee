const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware to parse JSON
 
// Connect to MongoDB (Without .env file)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Define Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});
const userModel = mongoose.model("emp", userSchema);

// Create & Save an Employee
const emp1 = new userModel({
    name: "Harini",
    age: 23
});
emp1.save();

// Dynamic Port Handling (Required for Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
