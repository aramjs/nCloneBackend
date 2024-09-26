import express from "express";
import linkRoutes from "./routes/linkRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/links", linkRoutes);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
