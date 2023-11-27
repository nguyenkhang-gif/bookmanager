import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-allrequest',
  templateUrl: './allrequest.component.html',
  styleUrls: ['./allrequest.component.scss'],
})
export class AllrequestComponent implements OnInit {
  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private checkoutService: CheckoutService
  ) {}
  getSafeImageUrl(input: any) {
    return this.imageService.getSafeImageUrl(input);
  }
  //load all data


  // ================DATA===============
  listCheckout: any[] = [];
  value=''
  // ================END OF DATA===============
  loadData() {
    this.checkoutService.getAllCheckout().subscribe((allcheckout) => {
      console.log(allcheckout);
      //0 là đang sử lý
      //1 là trả đúng hạng
      //2 là trễ
      this.listCheckout = allcheckout;
      this.listCheckout.forEach((item) => {
        this.userService.getUser(item.userid).subscribe((user) => {
          console.log('user', user.firstName);
          item.user = user;
        });
      });
    });
  }

  //=============================HandleSearch================
  onSubmit(){
    console.log(this.value);
    
  }


  setDataWithPageIndex(pageIndex: number, pageSize: number){
    
  }
  //=============================END OF HandleSearch================

  //=============================BOOKID STUFF=========================
  convertToPaddedString(number: any) {
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
  //=============================END OF BOOKID STUFF=========================

  ngOnInit(): void {
    this.loadData();
  }
}
