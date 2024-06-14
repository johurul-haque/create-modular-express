import { globalCatch } from "@middlewares/global-catch";
import cors from "cors";
import express from "express";
import router from "routes";
import { catchAsync } from "@utils";
import { notFound } from "@/utils/not-found";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.use(
  "*",
  catchAsync(() => notFound()),
);

app.use(globalCatch);

export default app;
