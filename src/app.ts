import express from "express";
import expenseRouter from "./routes/expenseRouter";

const app = express();

// Middleware
app.use(express.json());
// Mount expense routes
app.use("/api/expenses", expenseRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your API!" });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});


export default app;