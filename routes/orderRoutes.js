
const express = require("express");
const { param } = require("express-validator");
const { listOrders, markAsShipped } = require("../controllers/orderController");
const auth = require("../middlewares/auth");
const validationErrorHandler = require("../middlewares/validationErrorHandler");

const router = express.Router();

router.get("/", auth, listOrders);

router.put(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid order ID")],
  validationErrorHandler,
  auth,
  markAsShipped
);

module.exports = router;
