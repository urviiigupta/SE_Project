import mongoose from "mongoose";

const connectToDatabse= async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/hms", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}

export default connectToDatabse;