const Customer = require("../models/Customer");

// CREATE
const createCustomer = async (data) => {
    const { userId, fullName, contactNumber, address } = data;

    // Business logic: bawal duplicate customer per user
    const existingCustomer = await Customer.findOne({ userId });
    if (existingCustomer) {
        throw new Error("Customer already exists for this user");
    }

    return await Customer.create({
        userId,
        fullName,
        contactNumber,
        address
    });
};

// READ ALL
const getAllCustomers = async () => {
    return await Customer.find().populate("userId", "email role");
};

// READ ONE
const getCustomerById = async (customerId) => {
    const customer = await Customer.findById(customerId).populate("userId", "email");
    if (!customer) throw new Error("Customer not found");
    return customer;
};

// UPDATE
const updateCustomer = async (customerId, data) => {
    const customer = await Customer.findById(customerId);
    if (!customer) throw new Error("Customer not found");

    Object.assign(customer, data);
    await customer.save();

    return customer;
};

// DELETE
const deleteCustomer = async (customerId) => {
    const customer = await Customer.findById(customerId);
    if (!customer) throw new Error("Customer not found");

    await customer.deleteOne();
    return { message: "Customer deleted successfully" };
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
