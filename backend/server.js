require("dotenv").config();
const express = require('express');
const dbConnection = require('./config/db');
const routes = require("./routes/index");
const cors = require('cors');
const path = require("path");
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4002;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

dbConnection();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
