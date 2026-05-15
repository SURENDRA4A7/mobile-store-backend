const express = require("express");
const cors = require("cors");

require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});