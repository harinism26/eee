const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
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

// Sample Route (Fixes "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Hello, your Express app is running on Render! 🚀");
});

// Get all users from MongoDB
app.get("/users", async (req, res) => {
    const users = await userModel.find();
    res.json(users);
});

// Dynamic Port Handling
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
