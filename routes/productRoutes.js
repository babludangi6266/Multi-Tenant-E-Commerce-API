
const express = require("express");
const { body, param } = require("express-validator");
const {
  addProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const auth = require("../middlewares/auth");
const validationErrorHandler = require("../middlewares/validationErrorHandler");

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  ],
  validationErrorHandler,
  auth,
  addProduct
);

router.get("/", auth, listProducts);

router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid product ID"),
    body("name").optional().notEmpty().withMessage("Product name cannot be empty"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  ],
  validationErrorHandler,
  auth,
  updateProduct
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid product ID")],
  validationErrorHandler,
  auth,
  deleteProduct
);

module.exports = router;
