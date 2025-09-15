import app from "./app.js";
import "dotenv/config.js";
import connectDB from "./db.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
