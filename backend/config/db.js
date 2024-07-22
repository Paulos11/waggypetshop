const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const mco = await mongoose.connect(process.env.MONGO_URL, {

    });
    if (mco) {
      console.log("db connection established");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);    process.exit(1);

    
  }
};

module.exports = dbConnection;
