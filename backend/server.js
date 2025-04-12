const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables if you use them later

const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes"); 
const categoryRoutes = require('./routes/category.routes');

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS

// MongoDB Connection
const dbURI = 'mongodb://127.0.0.1:27017/fullecom';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Groovy api routes :)
app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes); 
app.use('/api/categories', categoryRoutes);

// Define Routes (you'll have routes here later for user, product, and order collections)
app.get('/', (req, res) => {
  res.send('API is working');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//exporting for tests
module.exports = app;