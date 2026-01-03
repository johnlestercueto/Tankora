const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async ({ username, email, password, role }) => {
    if (!username || !email || !password)
        throw new Error("All fields required");

    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashed,
        role
    });

    return user;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    return user;
};

module.exports = { register, login };
