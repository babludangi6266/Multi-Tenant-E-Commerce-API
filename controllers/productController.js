const Product = require("../models/Product");

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const product = new Product({
      name,
      price,
      stock,
      vendor: req.vendor, // req.vendor is set by the auth middleware
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// List all products with pagination
exports.listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    const products = await Product.find({ vendor: req.vendor })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments({ vendor: req.vendor });

    res.json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, vendor: req.vendor }, // Ensure only the vendor can update their product
      { name, price, stock },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id, vendor: req.vendor });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
