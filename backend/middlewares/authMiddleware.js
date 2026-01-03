const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ================= AUTH MIDDLEWARE =================
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // attach user info to req
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized', error: err.message });
    }
};

// ================= ROLE MIDDLEWARE =================
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
};

const dealerMiddleware = (req, res, next) => {
    if (req.user.role !== 'dealer') {
        return res.status(403).json({ message: 'Access denied: Dealers only' });
    }
    next();
};

const customerMiddleware = (req, res, next) => {
    if (req.user.role !== 'customer') {
        return res.status(403).json({ message: 'Access denied: Customers only' });
    }
    next();
};

module.exports = {
    authMiddleware,
    adminMiddleware,
    dealerMiddleware,
    customerMiddleware
};
