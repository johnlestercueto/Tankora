const User = require('../models/User');
const Dealer = require('../models/Dealer');

// ================= ADMIN SERVICE ==================

// 1. Get all dealers
const getAllDealers = async () => {
    return await Dealer.find().populate('userId', 'username email role');
}

// 2. Approve a dealer
const approveDealer = async (dealerId) => {
    const dealer = await Dealer.findById(dealerId);
    if (!dealer) throw new Error('Dealer not found');

    dealer.isApproved = true;
    await dealer.save();

    return dealer;
}

// 3. Delete a dealer
const deleteDealer = async (dealerId) => {
    const dealer = await Dealer.findByIdAndDelete(dealerId);
    if (!dealer) throw new Error('Dealer not found');

    // optional: delete user account as well
    await User.findByIdAndDelete(dealer.userId);

    return dealer;
}

module.exports = {
    getAllDealers,
    approveDealer,
    deleteDealer
}
