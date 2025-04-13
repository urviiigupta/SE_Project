import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['student', 'mess_manager', 'hall_warden', 'controlling_warden', 'hall_clerk', 'hmc_chairman', 'admin'],
        required: true
      },
      createAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema)
export default User

