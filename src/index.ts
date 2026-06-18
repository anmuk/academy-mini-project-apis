import express from "express";
import expenseRouter from "./routes/expenseRouter";

const app = express();
const PORT = 3000;

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Try: http://localhost:${PORT}/health`);
});