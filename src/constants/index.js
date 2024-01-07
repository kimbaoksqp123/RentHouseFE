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
  { min: 1, max: 3 },
  { min: 3, max: 5 },
  { min: 5, max: 10 },
  { min: 10, max: 40 },
  { min: 40, max: 70 },
  { min: 70, max: 100 },
  { min: 100, max: 0 },
];
export const areaFilter = [
  { min: 0, max: 30 },
  { min: 30, max: 50 },
  { min: 50, max: 80 },
  { min: 80, max: 100 },
  { min: 100, max: 150 },
  { min: 150, max: 200 },
  { min: 200, max: 250 },
  { min: 250, max: 300 },
  { min: 300, max: 500 },
  { min: 500, max: 0 },
];
export const apartFilter = [
  { name: "Phòng trọ", value: 1 },
  { name: "Nhà nguyên căn", value: 2 },
  { name: "Căn hộ chung cư", value: 3 },  
];
export const districtList = [
  { id: 0, name: "Hai Bà Trưng" },
  { id: 1, name: "Hoàng Mai" },
  { id: 2, name: "Đống Đa" },
  { id: 3, name: "Hoàn Kiếm" },
  { id: 4, name: "Long Biên" },
];
export const locationList = [
  {
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
