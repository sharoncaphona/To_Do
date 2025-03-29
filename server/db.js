const mongoose = require('mongoose');

module.exports = async () => {
    try{
        const connectionParams = {
            useNewUrlParser:true,
            userCreateIndex:true,
            useUnifiedTopology:true
        };
        await mongoose.connect(
            "mongodb://localhost/TO_DO",
            connectionParams
        );
        console.log("Connected to database")
    }catch(error){
        console.log("Could not connect to the database.",error)
    }
}