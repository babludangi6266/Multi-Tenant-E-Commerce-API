
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

vendorSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("Vendor", vendorSchema);