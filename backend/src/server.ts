import express from "express";
import cors from "cors";
import userRoute from "../routes/usersRoutes.js";
import schoolRoute from "../routes/schooleRoutes.js";
import classRoute from "../routes/classRoutes.js";
import studentRoute from "../routes/studentRoutes.js";
import attendanceRoute from "../routes/attendanceRoute.js";
import homeworkRoute from "../routes/homeworkRoute.js";
import subjectRoute from "../routes/subjectRoutes.js";
import TCSRoute from "../routes/TeacherClassSubjectRoute.js";
import resultRoute from "../routes/resultsRoute.js";
import termRoute from '../routes/termRoutes.js'
import termSummaryRoute from '../routes/termSummaryRoutes.js'

const app = express();

app.use(express.json());
app.use(cors());

//user endpoint
app.use("/users", userRoute);
//school endpoint
app.use("/school", schoolRoute);
//class endpoint
app.use("/class", classRoute);
//student endpoint
app.use("/student", studentRoute);
//attendance endpoint
app.use("/attendance", attendanceRoute);
//homework endpoint
app.use("/homework", homeworkRoute);
//subject enpoint
app.use("/subject", subjectRoute);
//TCS endpoint
app.use('/tcs', TCSRoute)
//result endpoint
app.use('/results', resultRoute)
//term summary endpoint
app.use('/termSummary', termSummaryRoute)
//term endpoint
app.use('/term', termRoute)

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
