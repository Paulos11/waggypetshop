require("module-alias/register");
require("dotenv").config();
const express = require('express');
const dbConnection = require('./config/db');
const routes = require("./routes/index");
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 4002;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

dbConnection();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'skjalksjaksj',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));


app.use("/api", routes);




app.use("*", (req, res, next) => {
  next({ message: "Not Found", status: 404 });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
app.use((err, req, res, next) => {
  console.error('Global error handler. Full error object:', JSON.stringify(err, null, 2));
  console.error('Error stack:', err.stack);
  console.error('Request path:', req.path);
  console.error('Request method:', req.method);
  console.error('Request query:', req.query);
  console.error('Request params:', req.params);
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred',
    status: err.status || 500
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
