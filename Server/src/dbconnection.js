const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
                useNewUrlParser:true,
                useUnifiedTopology: true
        });
        console.log('MongoDB is connected!')
    } catch (err) {
        console.error('Error connecting MongoDB!', err);
        process.exit(1);
    }
}

module.exports = connectDB;