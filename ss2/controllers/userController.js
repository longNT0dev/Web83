import PostModel from "../models/posts.js"



const createPost = async (req, res) => {
    try {
        // Sẽ không được truyền userId từ body
        const { content } = req.body

        console.log(req.user);

        const { userId } = req.user

        await PostModel.create({
            content: content,
            userId: userId
        })

        return res.status(200).send("ok")
    } catch (err) {
        return res.status(400).send(err.message)

    }
}


const updatePost = async (req, res) => {
    try {
        const { postId, userId, newContent } = req.body

        const post = await PostModel.findById(postId)

        if (!post) {
            return res.status(400).send("Bài viết muốn cập nhật không tồn tại")
        }

        if (post.userId != userId) {
            return res.status(400).send("Bài viết không thuộc sở hữu")
        }

        post.content = newContent.trim()

        post.save()
    } catch (err) {
        res.send("not ok")
    }
}

// const createUser = () => {
// Kiểm tra và xử lý dữ liệu đầu vào

// Gọi tới service: Nghiệp vụ bài toán 

// Repository: Sử dụng Model -> Truy cập và lưu trữ dữ liệu

// Viết unit test

// -> service -> repository -> Thao tác với database
// return res.send("Bạn vừa lấy thông tin user")

// Gọi tới service 
//     return res.send("Bạn vừa tạo mới user")
// }

export {
    createPost,
    updatePost
}