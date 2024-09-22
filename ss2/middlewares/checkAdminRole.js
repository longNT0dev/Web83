const checkAdminRole = (req, res, next) => {
    const { id } = req.params
    if (id != 1) {
        return res.status(403).send({
            message: "UnAuthorized"
        })
    } else {
        return next()
    }
}


export default checkAdminRole