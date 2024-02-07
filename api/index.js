import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", productRoutes);

app.listen(8800);