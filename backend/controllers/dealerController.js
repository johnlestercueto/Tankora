const dealerService = require("../services/dealerService");

// GET dealer profile
const getDealerProfile = async (req, res) => {
  try {
    const userId = req.params.id; // kunin diretso sa URL
    const dealer = await dealerService.getDealerProfile(userId);
    res.json(dealer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE dealer profile
const updateDealerProfile = async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const dealer = await dealerService.updateDealerProfile(userId, updateData);
    res.json(dealer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createDealerProfile = async (req, res) => {
  try {
    // Kunin userId diretso sa body
    const { userId, contactNumber, location } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId are required" });
    }

    const dealer = await dealerService.createDealer({
      userId,
      contactNumber,
      location,
    });

    res.status(201).json(dealer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createDealerProfile,
  getDealerProfile,
  updateDealerProfile,
};
