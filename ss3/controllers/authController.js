import AccountModel from "../practice/models/Account.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const saltRounds = 10;

const register = async (req, res) => {
    try {
        let { email, password, role } = req.body
        // Validate dữ liệu
        if (!email) {
            return res.status(400).send("Email is required")
        } else {
            email = email.trim()
        }

        if (!password) {
            return res.status(400).send("Password is required")
        } else {
            password = password.trim()
        }

        if (!role) {
            return res.status(400).send("Role is required")
        } else {
            role = role.trim()
        }


        const isExistUser = await AccountModel.findOne({ email: email }).exec()

        if (isExistUser) {
            return res.status(400).send("Email already exists")
        }


        bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
            if (err) res.send("Have error when create account " + err.message)
            // Store hash in your password DB.

            const newUser = {
                email: email,
                password: hashedPassword,
                role: role
            }

            await AccountModel.create(newUser)

            res.status(200).send("ok")

        });
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await AccountModel.findOne({ email: email })

        if (!user) {
            return res.send("Email not found")
        }

        const hashedPasswordOfUser = user.password

        bcrypt.compare(password, hashedPasswordOfUser, function (err, result) {
            if (err) res.send(err.message)

            if (result) {
                // Trả về kết quả
                const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, "92sp9wBEqK7//B7XZTwvJfreN4jmKWIgUxvMZchbg7w=", { expiresIn: '1h' });
                return res.status(200).send(token)
            } else {
                return res.status(403).send("Login failed")
            }
        });

    } catch (err) {
        console.log(err)
    }
}

export { register, login}