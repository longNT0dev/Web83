import http from 'http';
import users from "./data.js"
import { randomOld } from './utils.js';

const app = http.createServer((req, res) => {
    switch (req.url) {
        // Câu 1
        case "/users":
            if (req.method === 'GET') {
                res.end(users)
            } else {
                res.end("Method not supported")
            }
            break
        // Câu 2
        case "/users/old":
            if (req.method === 'GET') {
                const filterUsers = users.filter((user) => user.age >= 50)
                res.end(JSON.stringify(filterUsers))
            } else {
                res.end("Method not supported")
            }
            break
        // Câu 3
        case "/users/add-random":
            if (req.method === 'POST') {
                const randomUser = {
                    id: users.length + 1,
                    userName: "nguyenthanhlong",
                    email: "nguyenthanhlong@gmail.com",
                    address: "Nam Định",
                    age: randomOld(),
                }

                users.push(randomUser)


                res.end(JSON.stringify(users))
            } else {
                res.end("Method not supported")
            }
            break;
        default:

            // Câu 4
            if (req.url.startsWith("/users/add")) {
                const splitUrl = req.url.split("?")
                const reqParams = splitUrl[1].split("&")

                const params = {

                }

                reqParams.map(reqParam => {
                    const [key, value] = reqParam.split("=")

                    params[key] = value
                })

                console.log(params)

                const newUser = {
                    id: users.length + 1,
                    userName: params.userName,
                    email: params.email,
                    address: params.address,
                    age: params.age
                }

                users.push(newUser)

                res.end(JSON.stringify(users))
            }

            
            break
    }
});


app.listen(8080, () => {
    console.log('Server is running!');
})