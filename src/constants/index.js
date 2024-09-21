import BasicInformation from "../views/post-register/basic_information";
import Utility from "../views/post-register/utility";

export const serveURL1 = "https://rent-house-0e71d6c3b728.herokuapp.com/api/";
export const serveURL = "http://127.0.0.1:8000/api";

export const sortTypes = [
    { name: "Mặc định", value: 0 },
    { name: "Tin mới nhất", value: 1 },
    { name: "Giá thấp đến cao", value: 2 },
    { name: "Giá cao đến thấp", value: 3 },
    { name: "Diện tích bé đến lớn", value: 4 },
    { name: "Diện tích lớn đến bé", value: 5 },
];
export const priceFilter = [
    { min: 0, max: 1 },
    { min: 1, max: 2 },
    { min: 2, max: 3 },
    { min: 3, max: 4 },
    { min: 4, max: 5 },
    { min: 5, max: 6 },
    { min: 6, max: 7 },
    { min: 7, max: 10 },
];
export const areaFilter = [
    { min: 0, max: 15 },
    { min: 15, max: 20 },
    { min: 20, max: 25 },
    { min: 25, max: 30 },
    { min: 30, max: 35 },
    { min: 35, max: 40 },
    { min: 40, max: 45 },
    { min: 45, max: 50 },
    { min: 50, max: 55 },
    { min: 55, max: 80 },
];
export const apartFilter = [
    { name: "Phòng trọ", value: 1 },
    { name: "Nhà nguyên căn", value: 2 },
    { name: "Chung cư Mini", value: 3 },
];
export const districtList = [
    { id: 0, name: "Hai Bà Trưng" },
    { id: 1, name: "Hoàng Mai" },
    { id: 2, name: "Đống Đa" },
    { id: 3, name: "Hoàn Kiếm" },
    { id: 4, name: "Long Biên" },
];
export const locationList = [{
        district: "Hai Bà Trưng",
        ward: [
            { name: "Ngô Thì Nhậm", street: ["Trần Xuân Soạn"] },
            { name: "Thanh Nhàn", street: ["Trần Khát Chân"] },
            { name: "Đồng Tâm", street: ["Trần Đại Nghĩa"] },
            { name: "Minh Khai", street: ["Minh Khai", '8/3'] },
            { name: "Vĩnh Tuy", street: ["Minh Khai", "Lạc Trung"] },
            { name: "Trương Định", street: ["Đại La"] },
            { name: "Bạch Mai", street: ["Đê Tô Hoàng"] },
        ],
    },
    {
        district: "Đống Đa",
        ward: [
            { name: "Phương Liên", street: [] },
            { name: "Phương Mai", street: [] },
            { name: "Khương Thượng", street: [] },
            { name: "Ngã Tư Sở", street: [] },
            { name: "Ô Chợ Dừa", street: [] },
            { name: "Quang Trung", street: [] },
        ],
    },
    {
        district: "Hoàng Mai",
        ward: [
            { name: "Định Công", street: [] },
            { name: "Đại Kim", street: [] },
            { name: "Giáp Bát", street: [] },
            { name: "Hoàng Liệt", street: [] },
            { name: "Hoàng Văn Thụ", street: [] },
            { name: "Yên Sở", street: [] },
        ],
    },
    {
        district: "Hoàn Kiếm",
        ward: [
            { name: "Lý Thái Tổ", street: [] },
            { name: "Phan Chu Trinh", street: [] },
            { name: "Phúc Tân", street: [] },
            { name: "Trần Hưng Đạo", street: [] },
            { name: "Tràng Tiền", street: [] },
            { name: "Chương Dương Độ", street: [] },
        ],
    },
    {
        district: "Long Biên",
        ward: [
            { name: "Bồ Đề", street: [] },
            { name: "Gia Thụy", street: [] },
            { name: "Đức Giang", street: [] },
            { name: "Thạch Bàn", street: [] },
            { name: "Sài Đồng", street: [] },
            { name: "Ngọc Lâm", street: [] },
        ],
    },
];

export const tabRegister = [
    { id: 0, name: "Thông tin cơ bản", children: < BasicInformation / > },
    { id: 1, name: "Tiện ích", children: < Utility / > },
];