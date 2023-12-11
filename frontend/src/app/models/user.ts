export interface User {
  id: string;
  ngaysinh: string;
  gioitinh: string;
  username: string;
  firstName: string;
  lastName: string;
  passwordHash: Uint8Array | null; // Use the appropriate data type for byte[]
  passwordSalt: Uint8Array | null;
  imageData: any|null; // Thêm cột imageData kiểu byte array
  bikhoa:any;
  email: string;
  quyen: any;
  phone_number: string;
  // address: string;
}
