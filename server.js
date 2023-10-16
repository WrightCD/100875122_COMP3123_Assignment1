require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8090;

app.use(express.json());
const employeeRouter = require("./routes/employees");
const userRouter = require("./routes/users");
app.use("/api/v1/emp/employees", employeeRouter);
app.use("/api/v1/user", userRouter);

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB Connection Error:", error);
});

db.once("open", () => {
  console.log("Connected to Database");
});

app.listen(port, () => console.log(`Server Started on ${port}`));
