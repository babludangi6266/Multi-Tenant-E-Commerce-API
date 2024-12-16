const Order = require("../models/Order");
const Product = require("../models/Product");

// 1. List all orders for the vendor's products
exports.listOrders = async (req, res) => {
  try {
    // Find products belonging to the logged-in vendor
    const products = await Product.find({ vendor: req.vendor });
    const productIds = products.map((product) => product._id);

    // Fetch orders related to these products
    const orders = await Order.find({ product: { $in: productIds } }).populate("product");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 2. Mark an order as shipped
exports.markAsShipped = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order and ensure the product belongs to the vendor
    const order = await Order.findById(id).populate("product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Check if the product belongs to the logged-in vendor
    if (order.product.vendor.toString() !== req.vendor) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update the order status
    order.status = "shipped";
    await order.save();

    res.status(200).json({ message: "Order marked as shipped", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
