import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import { errorHandlerMiddleware } from "./middlewares/errorHandleMiddleware.js";
import router from "./router/index.routes.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;
