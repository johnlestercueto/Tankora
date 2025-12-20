const dealerService = require('../services/dealerService');

// GET dealer profile
const getDealerProfile = async (req, res) => {
    try {
        const dealer = await dealerService.getDealerProfile(req.user._id);
        res.json(dealer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// UPDATE dealer profile
const updateDealerProfile = async (req, res) => {
    try {
        const dealer = await dealerService.updateDealerProfile(req.user._id, req.body);
        res.json(dealer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const createDealerProfile = async (req, res) => {
    try {
        // Kunin userId diretso sa body
        const { userId, shopName, contactNumber, location } = req.body;

        if (!userId || !shopName) {
            return res.status(400).json({ message: "userId and shopName are required" });
        }

        const dealer = await dealerService.createDealer({
            userId,
            shopName,
            contactNumber,
            location
        });

        res.status(201).json(dealer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    createDealerProfile,
    getDealerProfile,
    updateDealerProfile
}
