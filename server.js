import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import cors from "cors";

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);


// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Codveda Task Management API is running!"
    });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});


app.use(errorHandler);


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});