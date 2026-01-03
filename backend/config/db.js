const mongoose = require('mongoose'); 
// Import natin ang mongoose package para makapag-connect sa MongoDB

// Gumagawa tayo ng async function para sa database connection
const connectDB = async () => {
    try {
        // Subukang kumonekta sa MongoDB gamit ang URI na nasa .env file
        await mongoose.connect(process.env.MONGO_URI);

        // Kapag successful ang connection, maglalabas ng message sa console
        console.log('db connected');
    } catch (error) {
        // Kapag nagkaroon ng error sa connection, i-log ang error message
        console.error('db connection failed :', error.message);

        // process.exit(1) → pinapatigil ang buong Node.js app kapag fail ang DB connection
        process.exit(1);
    }
}

// I-eexport natin ang connectDB function para magamit sa ibang files (e.g. server.js)
module.exports = connectDB;
