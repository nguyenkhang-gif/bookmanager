export interface Review {
  id?: number;
  sachid: number;
  tieude: string;
  userid: string;
  rating: number;
  image:any;
  ngaydang: string;
  sach?: any; // Trường "sach" là tùy chọn nếu bạn không có interface riêng cho đối tượng "Sách".
  user?: string; // Trường "user" cũng là tùy chọn nếu bạn không có interface riêng cho đối tượng "Người dùng".
}
