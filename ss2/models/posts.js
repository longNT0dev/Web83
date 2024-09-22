import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        isPublic: Boolean,
    }
}, { timestamp: true })


const PostModel = mongoose.model("posts", postSchema)

export default PostModel