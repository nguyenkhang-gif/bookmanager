export interface checkout {
    id?: number;
    ngaymuon: string; // Dạng chuỗi ngày tháng, có thể chuyển đổi thành Date nếu cần
    userid: number;
    ngaytra: string; // Dạng chuỗi ngày tháng, có thể chuyển đổi thành Date nếu cần
    sachMuons: any[]; // Cần định rõ kiểu cho mảng sách muon
    user: any; // Cần định rõ kiểu cho user nếu có
  }