export interface User {
  id: string;
  ngaysinh: string;
  gioitinh: string;
  username: string;
  firstName: string;
  lastName: string;
  passwordHash: Uint8Array | null; // Use the appropriate data type for byte[]
  passwordSalt: Uint8Array | null;
  email: string;
  phone_number: string;
  // address: string;
}
