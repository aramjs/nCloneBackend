import express from "express";
import cors from "cors";
import linkRoutes from "./routes/linkRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors()); // This will allow all origins. You can configure it further if needed.

app.use("/api/links", linkRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
