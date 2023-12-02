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
      startDate: [''],
      endDate: [''],
    });
  }
  getSafeImageUrl(input: any) {
    return this.imageService.getSafeImageUrl(input);
  }
  //load all data

  // ================DATA===============
  listCheckout: any[] = [];
  value = '';

  isDone?: any;
  pageNum: number = 1;
  pageIndex: number = 1;
  itemInPage: number = 8;
  dateForm: FormGroup;
  // ================END OF DATA===============
  loadData() {
    this.checkoutService.getAllCheckout().subscribe((allcheckout) => {
      console.log(allcheckout);
      //0 là đang sử lý
      // this.listCheckout.length
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
    console.log(this.dateForm.get('startDate')?.value == '');
    console.log(this.dateForm.get('startDate')?.value == null);

    // console.log(
    //   this.imageService.convertDateString(
    //     this.dateForm.get('startDate')?.value.toString()
    //   )
    // );
    // let startDate =this.imageService.convertDateString(
    //   this.dateForm.get('startDate')?.value.toString()
    // )
    // this.dateForm.get('startDate')?.value.toString()
    this.checkoutService
      .getUserWithPageIndexPageSizeContent(
        this.pageIndex,
        this.itemInPage,
        this.value, //content

        this.dateForm.get('startDate')?.value != null
          ? this.imageService.convertDateString(
              this.dateForm.get('startDate')?.value.toString()
            )
          : null,
        this.dateForm.get('endDate')?.value != null
          ? this.imageService.convertDateString(
              this.dateForm.get('endDate')?.value.toString()
            )
          : null,
        // isDone
        this.isDone != 3 ? this.isDone : null
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.listCheckout = data;
          console.log(this.listCheckout);
          this.listCheckout.forEach((item) => {
            this.userService.getUser(item.userid).subscribe((user) => {
              console.log('user', user.firstName);
              item.user = user;
            });
          });
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  //=============================END OF HandleSearch================
  // ===========================HANDLE DELETE================
  handleDelete(id: any) {
    console.log('handle delete', id);
    this.checkoutService.deleteRequest(id).subscribe({
      next: (item) => {
        console.log(item);
        this.checkoutService.deleteCheckout(id).subscribe((data) => {
          console.log(data);
          this.onSubmit();
        });
      },
      error: (e) => {
        this.checkoutService.deleteCheckout(id).subscribe({
          next: (data) => {
            console.log(data);
            this.onSubmit();
          },
          error: (e) => {
            console.log(e);
            this.onSubmit();
          },
        });
        console.log(e);
      },
    });
  }

  // ===========================end of HANDLE DELETE================

  // ===========================HANDLE PAGENITE

  handleNextBefore(method: string) {
    if (method == '+' && this.listCheckout.length) {
      this.pageIndex++;
      this.onSubmit();
      // this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
    if (method == '-' && this.pageIndex > 1) {
      this.pageIndex--;
      // this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
      this.onSubmit();
    }
  }

  // ===========================END OF HANDLE PAGENITE

  //=======================HANDLE DATE STUFF=======================
  convertDateFormat(dateTimeString: any): string {
    const date = new Date(dateTimeString);
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
  //=======================END OF HANDLE DATE STUFF=======================

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

  // ==========================HANDLE CHANGE CAT=====================

  handleChangeIsDone(data: any) {
    this.isDone = data;
  }

  // ==========================END OF HANDLE CHANGE CAT===============

  ngOnInit(): void {
    // this.loadData();
    this.onSubmit();
  }
}
