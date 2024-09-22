import UserModel from "../models/users.js"

const register = async (req, res) => {
    try {
        let { username, email } = req.body
        // Validate dữ liệu
        if(!email) {
            return res.status(400).send("Email is required")
        } else {
            email = email.trim()
        }

        if (!username) {
            return res.status(400).send("Username is required")
        } else {
            username = username.trim()
        }

        const isExistUser = await UserModel.findOne({ email: email}).exec()

        if(isExistUser) {
            return res.status(400).send("Email already exists")
        }

        const newUser = {
            username: username,
            email: email,
        }

        await UserModel.create(newUser)


        res.status(200).send("ok")
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const login = (req, res) => {
    try {
        


    } catch (err) {

    }
}

export {
    register, login
}