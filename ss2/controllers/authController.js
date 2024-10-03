import { uuid } from "uuidv4"
import UserModel from "../models/users.js"
import bcrypt from 'bcrypt'
import otpGenerator from "otp-generator"
import OtpModel from "../models/otp.js";
import jwt from 'jsonwebtoken';
const saltRounds = 10;

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


        bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
            if (err) res.send("Have error when create account " + err.message)
            // Store hash in your password DB.

            const newUser = {
                username: username,
                email: email,
                password: hashedPassword
            }

            await UserModel.create(newUser)

            res.status(200).send("ok")

        });
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            res.send("Email not found")
        }

        const hashedPasswordOfUser = user.password

        bcrypt.compare(password, hashedPasswordOfUser, function (err, result) {
            if (err) res.send(err.message)

            if (result) {
                // Trả về kết quả
                const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
                res.status(200).send(token)
            } else {
                res.status(403).send("Login failed")
            }
        });

    } catch (err) {

    }
}

const forgotPassword = async (req, res) => {
    let { email } = req.body

    console.log(email);

    if (!email) {
        return res.status(400).send("Email is required")
    } else {
        email = email.trim()
    }

    const isExistUser = await UserModel.findOne({ email: email }).exec()

    if (!isExistUser) {
        return res.status(400).send("Email not found")
    }

    const generateOTP = otpGenerator.generate(6, { digits: true });

    await OtpModel.create({ otp: generateOTP, email: email })

    // Gửi lại OTP cho user (phone, email)
    return res.status(200).send({
        token: generateOTP
    })
}

const resetPassword = async (req, res) => {
    let { otp, newPassword } = req.body
    const MAX_OTP_TIME = 5 * 60 * 1000 // 5 minutes
    const validOTP = await OtpModel.findOne({ otp })

    if (validOTP) {
        // Kiểm tra xem hết hạn hay chưa
        const date = new Date()
        const currentDate = date.getTime()
        const diffTime = currentDate - validOTP.createdAt
        if (diffTime > MAX_OTP_TIME) {
            await OtpModel.findOneAndDelete({ otp })

            res.send("OTP hết hạn")
        } else {
            const user = await UserModel.findOne({ email: validOTP.email })

            bcrypt.hash(newPassword, saltRounds, async function (err, hashedPassword) {
                if (err) res.send("Have error when update password" + err.message)
                // Store hash in your password DB.

                user.password = hashedPassword

                await user.save()

                res.status(200).send("ok")

            });
        }
    } else {
        res.send("OTP not exist")
    }
}




export {
    register, login, forgotPassword, resetPassword
}