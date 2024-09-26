import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    avatar: String
}, { timestamp: true })


const UserModel = mongoose.model("users", userSchema)

export default UserModel