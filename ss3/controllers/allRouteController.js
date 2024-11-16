import CustomerModel from "../practice/models/Customer.js"
import EmployeeModel from "../practice/models/Employee.js"
import ManagerModel from "../practice/models/Manager.js"

const getInformationAccount = async (req, res) => {
    // Lấy ra Id người dùng đang đăng nhập từ token
    // Từ role => Query từ bảng nào ??

    const currentUser = req.user

    let infoModel = {
        "MANAGER": ManagerModel,
        "CUSTOMER": CustomerModel,
        "EMPLOYEE": EmployeeModel
    }[currentUser.role]

    let result = await infoModel.findOne({ accountId: currentUser.userId }).populate("accountId", 'email role isActive')

    return res.json(result)
}

const createInformationAccount = async (req, res) => {
    const { phone, address, department}  = req.body
    const currentUser = req.user

    let infoModel = {
        "MANAGER": ManagerModel,
        "CUSTOMER": CustomerModel,
        "EMPLOYEE": EmployeeModel
    }[currentUser.role]

    const newInfo = {
        phone: phone,
        accountId: currentUser.userId,
    }

    // Kiểm tra dữ liệu hợp lệ 
    if (currentUser.role == "MANAGER" || currentUser.role == "EMPLOYEE") {
        // Validate department
        newInfo.department = department
    } else if (currentUser.role == "CUSTOMER") {
        // Validate address
        newInfo.address = address
    }


    await infoModel.create(newInfo)

    return res.json("ok")

}

export { getInformationAccount, createInformationAccount }