const adminService = require('../services/adminService');

// GET all dealers
const getAllDealers = async (req, res) => {
    try {
        const dealers = await adminService.getAllDealers();
        res.json(dealers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Approve dealer
const approveDealer = async (req, res) => {
    try {
        const { dealerId } = req.params;
        const dealer = await adminService.approveDealer(dealerId);
        res.json(
            {
            message: 'Dealer approved successfully',
            dealer
            }
        );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete dealer
const deleteDealer = async (req, res) => {
    try {
        const { dealerId } = req.params;
        const dealer = await adminService.deleteDealer(dealerId);
        res.json({ message: 'Dealer deleted', dealer });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getAllDealers,
    approveDealer,
    deleteDealer
}
