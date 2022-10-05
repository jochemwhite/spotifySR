import express, { Request, Response, NextFunction } from "express";
import spotifyRoutes from "./routes/spotify";
import dotenv from "dotenv";
dotenv.config();

import { spotify } from "./controllers/spotify";

const port = process.env.PORT || 8888;
const app = express();

app.use("/spotify", spotifyRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`spotify login: http://localhost:${port}/spotify/login`);
});

