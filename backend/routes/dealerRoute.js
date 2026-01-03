const express = require('express');
const router = express.Router();
const dealerController = require('../controllers/dealerController');
//const { authMiddleware, dealerMiddleware } = require('../middlewares/authMiddleware');

// Middleware: verify JWT + role = dealer
//router.use(authMiddleware);
//router.use(dealerMiddleware);

// Routes
// Create profile (only if doesn't exist yet)
router.post('/', dealerController.createDealerProfile);
router.get('/profile/:id', dealerController.getDealerProfile);
router.put('/profile', dealerController.updateDealerProfile);

module.exports = router;
