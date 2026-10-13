const mongoose = require('mongoose');
const connectDB=async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/first');
            console.log(`mongoDB connected ${conn.connection.host}`);
    }
    catch(error){
        console.error(`mongoDB not connected ${error.message}`);
        process.exit(1);
    }
};
module.exports=connectDB;