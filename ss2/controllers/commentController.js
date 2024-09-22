import CommentModel from "../models/comments.js"
import PostModel from "../models/posts.js"

const getComments = async (req, res) => {
    const { postId } = req.body
    await CommentModel.find({ postId }).exec()
}

const getThreeLastComments = async (req, res) => {
    const posts = await PostModel.find()
    const result = {}

    const postIds = posts.map(post => post.id)

    console.log(postIds)

    const comments = await CommentModel.find({ postId: { $in: postIds } })

    console.log(comments)
    for(let comment of comments) {
        if(!(comment.postId in result)) {
            result[comment.postId] = [comment]
        } else {
            result[comment.postId].push(comment)
        }
    }

    console.log("Data:", result)
}

export {
    getComments,
    getThreeLastComments
}