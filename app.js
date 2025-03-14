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
const userModel = mongoose.model("emp", userSchema); // ✅ Collection: "emps"

// ✅ Insert a New User (Harini, 23) When Server Starts
async function insertUser() {
    try {
        const existingUser = await userModel.findOne({ name: "Harini", age: 23 });
        if (!existingUser) {
            await userModel.create({ name: "Harini", age: 23 });
            console.log("User Harini (23) inserted successfully!");
        } else {
            console.log("User Harini (23) already exists.");
        }
    } catch (error) {
        console.error("Error inserting user:", error);
    }
}
insertUser(); // Call function to add user

// Default Route
app.get("/", (req, res) => {
    res.send("Hello, your Express app is running on Render! 🚀");
});

// ✅ Get All Users from MongoDB (Check in Atlas)
app.get("/users", async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Dynamic Port Handling
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
