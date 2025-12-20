const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
//const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

// Middleware: verify JWT + role = admin
//router.use(authMiddleware);
//router.use(adminMiddleware);

// Routes
router.get('/dealers', adminController.getAllDealers);
router.put('/approve/:dealerId', adminController.approveDealer);
router.delete('/dealers/:dealerId', adminController.deleteDealer);

module.exports = router;
