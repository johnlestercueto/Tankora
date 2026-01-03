const Dealer = require("../models/Dealer");

// ================= DEALER SERVICE ==================

// 1️⃣ Get own dealer profile by userId
const getDealerProfile = async (userId) => {
  const dealer = await Dealer.findOne({ userId }).populate(
    "userId",
    "username email role"
  );
  if (!dealer) throw new Error("Dealer profile not found");
  return dealer;
};

// 2️⃣ Update dealer profile
const updateDealerProfile = async (userId, updateData) => {
  const dealer = await Dealer.findOneAndUpdate({ userId }, updateData, {
    new: true,
  }).populate("userId", "username email role");

  if (!dealer) throw new Error("Dealer profile not found");
  return dealer;
};

// 3️⃣ Create dealer profile
const createDealer = async ({ userId, contactNumber, location }) => {
  // Check if dealer profile already exists for this user
  const existing = await Dealer.findOne({ userId });
  if (existing) throw new Error("Dealer profile already exists");

  // Create new dealer
  const dealer = new Dealer({
    userId,
    contactNumber,
    location,
    isApproved: true, // default
  });

  await dealer.save();
  return dealer;
};

module.exports = {
  getDealerProfile,
  updateDealerProfile,
  createDealer,
};
