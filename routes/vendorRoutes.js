
const express = require("express");
const { body } = require("express-validator");
const { registerVendor, loginVendor } = require("../controllers/vendorController");
const validationErrorHandler = require("../middlewares/validationErrorHandler");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  validationErrorHandler,
  registerVendor
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validationErrorHandler,
  loginVendor
);

module.exports = router;
