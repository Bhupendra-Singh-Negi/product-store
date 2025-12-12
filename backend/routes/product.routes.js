import express from "express";

import { getProducts, createProducts, deleteProduct, updateProduct } from "../controllers/product.controller.js";
const router=express.Router();

router.post("/", createProducts);
router.get("/",getProducts)
router.delete("/:id",deleteProduct)
router.put("/:id",updateProduct)

export default router;