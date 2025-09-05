const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const noteRouter = require("./routes/noteRouter");

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/v1/notes", noteRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
