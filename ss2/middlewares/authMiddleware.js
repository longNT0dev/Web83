import jwt from "jsonwebtoken"

const authMiddleware = {
    authentication: (req, res, next) => {
        // Giả sử req gửi kèm token trong Header, nếu có => Đã đăng nhập, nếu không => Chưa đăng nhập

        // Authorization: "Bearer Token"
        const authorization = req.headers['authorization']?.split(" ")

        if (Array.isArray(authorization)) {
            const token = authorization[1]

            // Giải mã token để lấy thông tin user
            if (token) {
                // const [from, userId, email, ...otherInfo] = token.split("-")
                try {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY)
                    req.user = decodedToken

                    return next()

                } catch (e) {
                    console.log(e);
                    return res.send(e)
                }
            } else {
                res.status(403).send("Unauthorized")
            }

        } else {
            res.status(403).send("Unauthorized")
        }
    },
    isAdmin: (req, res, next) => {
        const authorization = req.headers['authorization']?.split(" ")

        if (Array.isArray(authorization)) {
            const token = authorization[1]

            // Giải mã token để lấy thông tin user
            if (token) {
                if (token == "admin") {
                    req.user = {
                        role: "admin",
                        username: "longnt",
                        email: "longnt@gmail.com"
                    }

                    return next()
                } else {
                    res.status(403).send("Unauthorized")

                }
            } else {
                res.status(403).send("Unauthorized")
            }

        } else {
            res.status(403).send("Unauthorized")
        }
    },

}

export default authMiddleware