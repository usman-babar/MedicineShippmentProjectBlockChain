import express from "express";

import {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
  searchProduct,
} from "../controller/productController.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/all", getProducts);
router.post("/search", searchProduct);
router.get("/:id", getProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;