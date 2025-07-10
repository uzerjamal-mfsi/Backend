import express from "express";
import logger from "./middleware/logger.js";
import router from "./routes/routes.js";
import config from "./config/config.js";
import connectDB from "./config/mongoose.js";

const app = express();
connectDB();

app.use(express.json());
app.use(logger);

app.use("/", router);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
