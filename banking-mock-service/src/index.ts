import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import databaseConnection from "./config/mongoDb.js";
import bankingRouter from "./routes/banking.js";
import { seedInitialUser } from "./seed.js";
const app: Application = express();
const PORT = process.env.PORT || 4000;

// * Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

// mount API routes
app.use("/api", bankingRouter);

// connect DB, seed sample data and start server
(async () => {
  try {
    await databaseConnection();
    await seedInitialUser();
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
  }
})();
