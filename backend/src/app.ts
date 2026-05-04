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
import termRoute from "../routes/termRoutes.js";
import termSummaryRoute from "../routes/termSummaryRoutes.js";
import announcementRoute from "../routes/announcementRoutes.js";
import notificationRoute from "../routes/notificationRoute.js";
import levelRoute from "../routes/levelRoutes.js";
import feeStructureRoute from "../routes/feeStructureRoutes.js";
import feeItemRoute from "../routes/feeItemRoutes.js";
import paymentRoute from "../routes/paymentRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({
  methods : ['POST', 'GET', 'PUT', 'DELETE'],
  origin : '*',
  credentials : true
}));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

//user endpoint
app.use("/users", userRoute);
//school endpoint
app.use("/schools", schoolRoute);
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
app.use("/tcs", TCSRoute);
//result endpoint
app.use("/results", resultRoute);
//term summary endpoint
app.use("/termSummary", termSummaryRoute);
//term endpoint
app.use("/term", termRoute);
//announcement endpoint
app.use("/announcement", announcementRoute);
//notification endpoint
app.use("/notification", notificationRoute);
//level endpoint
app.use("/level", levelRoute);
//fee structure endpoint
app.use("/feeStructure", feeStructureRoute);
//fee item endpoint
app.use("/feeItem", feeItemRoute);
//payment endpoint
app.use("/payment", paymentRoute);

export default app;
