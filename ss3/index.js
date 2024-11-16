import express from "express"
import mongoose from "mongoose"
import AuthorModel from "./model/Author.model.js";
import BookModel from "./model/Book.model.js";
import multer from "multer"
import { v2 as cloudinary } from 'cloudinary';
import authMiddleware from "../ss2/middlewares/authMiddleware.js";
import authRoute from "./routes/authRoute.js"
import allRoleRoute from "./routes/allRoleRoute.js"
const app = express();


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

mongoose.connect(`mongodb+srv://test:orRGaLXmovXNvDAr@cluster0.twurc3h.mongodb.net/`)
    .then(() => {
        console.log("Kết nối tới database thành công");
    })
    .catch(err => {
        console.log("Kết nối tới database thất bại", err);
    });


cloudinary.config({
    cloud_name: 'dxe7lsk2l',
    api_key: '414112232159793',
    api_secret: 'CrNjQMSsqR-SFJ1jB11g7A3R5Is'
})

app.use(express.json())



app.use("/authentication", authRoute)
app.use("/all-role", authMiddleware.authentication, allRoleRoute)
// app.use("/manager", authMiddleware.isManager, managerRoute)

// app.post("/create-author", async function (req, res) {
//     const newAuthor = {
//         name: req.body.name
//     }

//     await AuthorModel.create(newAuthor)

//     res.json("Tạo tác giả thành công")
// })


// app.post("/create-book", upload.single('file'), async function (req, res) {
//     console.log(req.file)
//     console.log(req.body.title)
//     console.log(req.body.author)

//     const file = req.file

//     // Kiểm tra tính hợp của 2 dữ liệu title, author 

//     const newBook = {
//         title: req.body.title,
//         author: req.body.author,
//     }


//     if (req.file) {
//         const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
//         const fileName = file.originalname.split('.')[0];


//         cloudinary.uploader.upload(dataUrl, {
//             public_id: `${fileName}-${newBook.author}-${Date.now()}`,
//             resource_type: 'auto',
//             // có thể thêm field folder nếu như muốn tổ chức
//         }, async (err, result) => {
//             if (err) {
//                 throw err
//             }

//             if (result && result.secure_url) {

//                 newBook.coverBookUrl = result.secure_url

//                 // console.log(result.secure_url);
//                 // lấy secure_url từ đây để lưu vào database.
//                 await BookModel.create(newBook)

//             }
//         });
//     } else {
//         await BookModel.create(newBook)
//     }



//     res.json("Tạo tác giả thành công")
// })


// app.get("/get-books", async function (req, res) {
//     const result = await BookModel.find().populate("author").populate("authorId")


//     res.json(result)
// })

// app.post('/upload', upload.single('file'), (req, res) => {
//     // Truy cập dữ liệu tệp từ req.file
//     const file = req.file;

//     if (!file) {
//         return res.status(400).json({ error: 'Không có tệp được tải lên.' });
//     }

//     const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
//     const fileName = file.originalname.split('.')[0];


//     cloudinary.uploader.upload(dataUrl, {
//         public_id: fileName,
//         resource_type: 'auto',
//         // có thể thêm field folder nếu như muốn tổ chức
//     }, (err, result) => {
//         if (result) {

//             console.log(result)

//             // console.log(result.secure_url);
//             // lấy secure_url từ đây để lưu vào database.
//         }
//     });

//     // Trả về phản hồi với thông tin về tệp đã tải lên
//     res.json({ message: 'Tệp được tải lên thành công.', data: file });
// });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});