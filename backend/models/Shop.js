const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealer",
      required: true,
      unique: true, // 1 dealer = 1 shop
    },

    shopName: String,
    address: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);
