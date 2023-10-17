export interface Book {
    id: number;
    chieudai: number;
    chieurong: number;
    chudeid: number;
    dinhdang: string;
    dongia: number;
    hinhanh: string;
    nhaxuatbanid: number;
    soluong: number;
    sotrang: number;
    tacgiaid: number;
    tensach: string;
    chude: any | null;  // Kiểu dữ liệu của chude chưa rõ
    nhanXets: any[];    // Kiểu dữ liệu của nhanXets chưa rõ
    nhaxuatban: any | null;  // Kiểu dữ liệu của nhaxuatban chưa rõ
    sachMuons: any[];   // Kiểu dữ liệu của sachMuons chưa rõ
    tacgia: any | null;  // Kiểu dữ liệu của tacgia chưa rõ
}