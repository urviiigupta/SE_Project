import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabse from "./db/db.js";

const userRegister= async () => {
    await connectToDatabse();
    try{
        const hashedPassword = await bcrypt.hash("admin", 10);
        const newUser=new User({
            name:"Admin",
            email:"admin@gmail.com",
            password:hashedPassword,
            role:"admin"
        })

        await newUser.save();
        console.log("User created successfully");
    }

    catch(err){
        console.error("Error creating user:", err);
    }
}

userRegister();