import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private sanitizer: DomSanitizer) {}
  getSafeImageUrl(base64?: any): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  convertToBase64(file: File, callback: (base64String: string) => void): void {
    if (!file) {
      console.error('No file provided');
      callback('');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (result && typeof result === 'string') {
        const base64String = result.split(',')[1];
        callback(base64String);
      } else {
        console.error('Error reading the file');
        callback('');
      }
    };

    reader.onerror = () => {
      console.error('Error reading the file');
      callback('');
    };

    reader.readAsDataURL(file);
  }

  checkFileSize(file: File, maxSizeInBytes: number): boolean {
    const fileSizeInBytes = file.size;

    if (fileSizeInBytes > maxSizeInBytes) {
      console.error('File size exceeds the maximum allowed size.');
      return false;
    }

    return true;
  }



  convertDateString(inputDateString:any) {
    // Chuyển đổi thành đối tượng Date
    const originalDate = new Date(inputDateString);
  
    // Lấy các thành phần ngày tháng
    const year = originalDate.getFullYear();
    const month = originalDate.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = originalDate.getDate();
    const hours = originalDate.getHours();
    const minutes = originalDate.getMinutes();
    const seconds = originalDate.getSeconds();
  
    // Tạo chuỗi ngày tháng mới
    const newDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    if(inputDateString==''||inputDateString==null){
      return ''
    }
    return newDateString;
  }

  convertToPaddedString(number:any) {
    // Chuyển số nguyên thành chuỗi
    let strNumber = number.toString();
  
    // Tính số lượng số 0 cần bù
    let zeroCount = 8 - strNumber.length;
  
    // Bù số 0 nếu cần
    while (zeroCount > 0) {
      strNumber = '0' + strNumber;
      zeroCount--;
    }
  
    return strNumber;
  }
}
