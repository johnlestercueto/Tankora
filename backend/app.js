const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ======================== MIDDLEWARES ========================

// para hindi mag-undefined ang req.body
app.use(express.json());

// CORS (pwede mo pang higpitan later)
app.use(cors());

// static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================== ROUTES ========================

// Auth (login / register)
app.use("/api/auth", require("./routes/authRoute"));

// Products (LPG products)
app.use("/api/products", require("./routes/productRoute"));

// Orders (booking / orders)
app.use("/api/orders", require("./routes/orderRoute"));

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/dealer", require("./routes/dealerRoute"));
app.use("/api/customers", require("./routes/customerRoute"));
app.use("/api/shops", require("./routes/shopRoute"));

// ======================== TEST ROUTE ========================
app.get("/", (req, res) => {
  res.send("Hello! Express server is running 🚀");
});

// ======================== EXPORT ========================
module.exports = app;
