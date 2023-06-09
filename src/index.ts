import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { RequestContext } from "@mikro-orm/core";
import { env, orm } from "./config/index.js";
import {
  authRouter,
  categoryRouter,
  commentRouter,
  feedbackRouter,
  statusRouter,
} from "./routes/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({ origin: env.origin, credentials: true }));
app.use(express.static(join(__dirname, "../public")));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => RequestContext.create(orm.em, next));

app.use("/api/auth", authRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/comment", commentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/status", statusRouter);

app.listen(env.port, () => {
  console.log(`Listening on port ${env.port}`);
});
