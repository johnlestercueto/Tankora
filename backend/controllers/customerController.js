const customerService = require("../services/customerService");

// CREATE
const createCustomer = async (req, res) => {
    try {
        const customer = await customerService.createCustomer(req.body);
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// READ ALL
const getCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ ONE
const getCustomer = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        res.json(customer);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// UPDATE
const updateCustomer = async (req, res) => {
    try {
        const customer = await customerService.updateCustomer(
            req.params.id,
            req.body
        );
        res.json(customer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE
const deleteCustomer = async (req, res) => {
    try {
        const result = await customerService.deleteCustomer(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
};
