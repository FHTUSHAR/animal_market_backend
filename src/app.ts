import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import globalErrorHandler from "./app/middleware/globalErrorHandler";
import routes from "./app/routes";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
const app: Application = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", routes);

// app.get('/',async(req:Request,res:Response,next:NextFunction)=>{
//     // Promise.reject(new Error('Unhandled error'))
//     // throw new Error('Ore vai sei error')
// })
//global error handler
// app.use(globalErrorHandler);

//handle route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Not Found",
      },
    ],
  });
  next();
});

export default app;
