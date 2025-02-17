import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
        console.log(`Application listening on port ${config.port}`)
      })
    console.log("Database is connected")
  } catch (e) {
    console.log("Database connection failed",e);
  }
}

main()