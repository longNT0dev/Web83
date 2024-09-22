import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamp: true })


const CommentModel = mongoose.model("comments", commentSchema)

export default CommentModel