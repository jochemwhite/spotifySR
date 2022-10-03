import express from "express";
const port = process.env.PORT || 8080;
import cors from "cors";
import router from "./routes/routes.js";
const app = express();


app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(router);
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
