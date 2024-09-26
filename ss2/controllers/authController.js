import { uuid } from "uuidv4"
import UserModel from "../models/users.js"

const register = async (req, res) => {
    try {
        let { username, email, password } = req.body
        // Validate dữ liệu
        if (!email) {
            return res.status(400).send("Email is required")
        } else {
            email = email.trim()
        }

        if (!username) {
            return res.status(400).send("Username is required")
        } else {
            username = username.trim()
        }

        if (!password) {
            return res.status(400).send("Password is required")
        } else {
            password = password.trim()
        }

        const isExistUser = await UserModel.findOne({ email: email }).exec()

        if (isExistUser) {
            return res.status(400).send("Email already exists")
        }

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        await UserModel.create(newUser)


        res.status(200).send("ok")
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email: email, password: password})
        
        if(user) {
            // Trả về kết quả
            res.status(200).send(`web-${user._id}-${user.email}-${uuid()}`)
        } else {
            res.status(403).send("Login failed")
        }


    } catch (err) {

    }
}

export {
    register, login
}