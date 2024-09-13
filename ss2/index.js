import express from 'express';
import { users, posts } from "./data.js"
import { uuid } from 'uuidv4';
const app = express();

app.listen(8080, () => {
    console.log('Server is running!');
});

// Request -> Route -> Response
// Request -> Middleware -> Route -> Response

app.use(express.json()); // middleware

// Restful API

// GET
// app.get("/users", (req, res) => {

//     // 200: OK,
//     // 400: Bad Request 
//     // 404: Not Found
//     // 401: Unauthorized
//     // 500: Internal Server Error
//     res.status(200).send(users)
// })

// query: Lấy dữ liệu từ ? &
// app.get("/users/*", (req, res) => {
//     console.log(req.query);
// })

// params: Lấy dữ liệu từ :
// app.get("/users/:old", (req, res) => {
//     const { old } = req.params

//     const filterUsers = users.filter((user) => user.age >= old)

//     res.status(200).send(filterUsers)
// })


// // POST
// // body: Gửi dữ liệu phức tạp hơn
// app.post("/users/add-random", (req, res) => {
//     console.log(req.body);
// })

// // PUT/PATCH
// app.put("users/update-user", (req, res) => {

// })

// // DELETE
// app.delete("/user", (req, res) => {

// })


// Câu 2
app.post("/user/create", (req, res) => {
    const { userName, email, age, avatar } = req.body

    if (!userName) {
        res.status(400).send({
            message: "Please enter a username"
        })
    } else {
        if (userName.length > 64) {
            res.status(400).send({
                message: "Maximum length is 64 characters"
            })
        }
    }

    // Email có đúng định dạng không (BTVN)
    if (!email) {
        res.status(400).send({
            message: "Email is required"
        })
    } else {
        const isExist = users.findIndex(user => user.email === email)

        if (isExist > 0) {
            res.status(400).send({
                message: "Email is already used "
            })
        }
    }

    if (age <= 0) {
        res.status(400).send({
            message: "Age is greater than 0"
        })
    }


    const newUser = {
        id: uuid(),
        userName, email, age, avatar
    }

    users.push(newUser)

    console.log(newUser)

    res.status(200).send({
        message: "User created successfully"
    })
})


// Câu 3
app.get("/posts/:userId", (req, res) => {
    const filterPosts = posts.filter(post => post.userId === req.params.userId)

    if (filterPosts.length === 0) {
        res.status(404).send({
            message: "No post found"
        })
    } else {
        res.status(200).send({
            message: "Success",
            data: filterPosts
        })
    }
})


// Câu 4 
app.post("/posts/:userId", (req, res) => {
    const { content, isPublic } = req.body

    const { userId } = req.params

    const date = new Date()

    const newPost = {
        userId,
        content,
        isPublic,
        postId: uuid(),
        createdAt: date.toISOString()
    }


    posts.push(newPost)


    res.status(200).send({
        message: "Success",
        data: posts
    })
})

app.get("/posts/all-public/get", (req, res) => {

    const publicPosts = posts.filter(post => post.isPublic)

    res.status(200).send({
        message: "ok",
        data: publicPosts
    })
})