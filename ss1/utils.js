let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
    return null;
};


let validatePassword = (str) => {
    // Kiểm tra password không được rỗng

    // Kiểm tra độ dài password > 6, < 64 ký tự

    // Kiểm tra password có ít nhất 1 chữ viết Hoa, 1 ký tự đặc biệt, chứa số,...
}

// cú pháp xuất
// module.exports = hàm hoặc giá trị nào muốn xuất để các file khác có thể sử dụng
// ví dụ: 


let randomOld = () => {
    return parseInt((Math.random() * 70)) 
}


export {
    formatPhoneNumber,
    randomOld
}