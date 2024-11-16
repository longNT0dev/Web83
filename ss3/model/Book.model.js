import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors', // Tham chiếu đến collection authors
    },
    coverBookUrl: {
        type : String
    }
});

const BookModel = mongoose.model('books', bookSchema);

export default BookModel;