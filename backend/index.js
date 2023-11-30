import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./database/db.js";

import adminRoute from "./routes/admin.js"; 
import productRoute from "./routes/product.js";
import userRoute from "./routes/user.js";

const app = express()

dotenv.config();

const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(cors());

app.use("/admin", adminRoute)
app.use("/product", productRoute)
app.use("/user", userRoute)

Connection();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});