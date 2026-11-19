recipeRoutes = require("./routes/reciperoutes")
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Recipe Generator Backend is running!");
});
app.use("/api/recipes", recipeRoutes);
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});