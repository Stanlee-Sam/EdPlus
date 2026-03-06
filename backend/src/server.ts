import express, { Request, Response } from "express";
import cors from "cors";
import userRoute from "../routes/usersRoutes.js";
import schoolRoute from "../routes/schooleRoutes.js";
import classRoute from "../routes/classRoutes.js";
import studentRoute from "../routes/studentRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

//user route
app.use("/users", userRoute);
//school route
app.use("/school", schoolRoute);
//class route
app.use("/class", classRoute);
//student route
app.use("/student", studentRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
