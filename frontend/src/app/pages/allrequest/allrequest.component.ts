import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder,
    private checkoutService: CheckoutService
  ) {
    this.dateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  getSafeImageUrl(input: any) {
    return this.imageService.getSafeImageUrl(input);
  }
  //load all data

  // ================DATA===============
  listCheckout: any[] = [];
  value = '';
  pageNum: number = 1;
  pageIndex: number = 1;
  itemInPage: number = 8;
  dateForm: FormGroup;
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
  onSubmit() {
    console.log(this.value);
    console.log(this.dateForm.get('startDate')?.value.toString());
    // this.dateForm.get('startDate')?.value.toString()
    this.checkoutService
      .getUserWithPageIndexPageSizeContent(
        1,
        4,
        '',//content
        this.imageService.convertDateString(
          this.dateForm.get('startDate')?.value.toString()
        ),
        this.imageService.convertDateString(
          this.dateForm.get('endDate')?.value.toString()
        )
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  setDataWithPageIndex(pageIndex: number, pageSize: number) {
    this.checkoutService
      .getUserWithPageIndexPageSizeContent(1, 4, '', '', '2023-11-24T21:27:25')
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
  //=============================END OF HandleSearch================
  // ===========================HANDLE PAGENITE

  handleNextBefore(method: string) {
    if (method == '+' && this.listCheckout.length) {
      this.pageIndex++;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
    if (method == '-' && this.pageIndex > 1) {
      this.pageIndex--;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
  }

  // ===========================END OF HANDLE PAGENITE

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
