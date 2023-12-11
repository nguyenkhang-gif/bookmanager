import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { checkout } from 'src/app/models/checkout';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private fb: FormBuilder,
    private checkoutService: CheckoutService // private imageService:ImageService
  ) {
    this.dateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  @ViewChild(MatStepper) stepper!: MatStepper;
  Steps = [true, true, true];

  listUser: any[] = [];
  value = '';
  query = '';
  pageNum: number = 1;
  pageIndex: number = 1;
  itemInPage: number = 8;

  //input for check out
  userid?: any;

  //end of input for checkout
  getSafeImageUrl(item: any) {
    return this.imageService.getSafeImageUrl(item);
  }
  handleNextBefore(method: string) {
    if (method == '+' && this.listUser.length) {
      this.pageIndex++;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
    if (method == '-' && this.pageIndex > 1) {
      this.pageIndex--;
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    }
  }
  //=====================handle user data
  setDataWithPageIndex(pageIndex: number, pageSize: number) {
    console.log(this.value);

    if (this.query != '' && this.query != null) {
      this.userService
        .getUserWithPageIndexPageSizeContent(pageIndex, pageSize, this.query)
        .subscribe((item) => {
          console.log(item);
          this.listUser = item;
        });
    } else {
      this.userService
        .getUserWithIndexPageAndPageSize(pageIndex, pageSize)
        .subscribe((item) => {
          console.log(item);
          this.listUser = item;
        });
    }
  }

  // handle show user id
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
  onSubmit() {
    console.log(this.value);

    this.query = this.value;
    this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
    // this.router.navigate(['admin/checkout'], {
    //   queryParams: { q: this.value },
    // });
  }

  //=============HANDLE SUBMIT ALL DỮ LIỆU LÊN DATA BASE==============
  handleSubmitFinal() {
    this.popupWindowOpen = true;

    this.checkoutService
      .insertSingleCheckout({
        ngaymuon: this.imageService.convertDateString(
          this.dateForm.get('startDate')?.value.toString()
        ),
        ngaytra: this.imageService.convertDateString(
          this.dateForm.get('endDate')?.value.toString()
        ),
        userid: this.userid,
        isDone: 0,
      })
      .subscribe({
        next: (item) => {
          console.log('do the bookborrow stuff', item);
        },
        error: (e) => {
          console.log(e);
          if (e.status == 200) {
            this.checkoutService
              .getSingleCheckout({
                ngaymuon: this.imageService.convertDateString(
                  this.dateForm.get('startDate')?.value.toString()
                ),
                ngaytra: this.imageService.convertDateString(
                  this.dateForm.get('endDate')?.value.toString()
                ),
                userid: this.userid,
              })
              .subscribe((item_2) => {
                console.log('item:', item_2);
                this.checkoutService
                  .insertBookBorrow(
                    JSON.parse(localStorage.getItem('card')!),
                    item_2.id
                  )
                  .subscribe({
                    next: (data) => {
                      console.log(data);
                      this.isLoading = false;
                    },
                    error: (e) => {
                      console.log(e);
                      this.isLoading = false;
                    },
                  });
              });
          }
        },
      });
  }
  //=============END OF HANDLE SUBMIT ALL DỮ LIỆU LÊN DATA BASE==============

  // Ví dụ: Di chuyển đến bước tiếp theo
  nextStep() {
    this.stepper.next();
  }
  //======================STEP 1=====================================
  handleChoose(userid: any) {
    console.log(userid);
    this.userid = userid;
    this.Steps = [true, false, false];
    this.nextStep();
  }
  handleStepConfirm() {
    console.log(localStorage.getItem('card'));
    this.nextStep();
    this.userService.getUser(this.userid).subscribe((item) => {
      console.log(item);

      this.userinfo = item;
    });
  }

  //======================END OF STEP 1=====================================

  //==============================handle step 3=================
  dateForm: FormGroup;
  setStep3Data(startDate: any, endDate: any) {
    this.dateForm?.patchValue({
      startDate: startDate,
      endDate: endDate,
    });
  }

  userinfo?: any;

  getcurentDate() {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 7);
    this.setStep3Data(currentDate, endDate);
    //
  }
  //==============================end of handle step 3=================
  //==============================HANDLE CHECKOUT STUFF==================

  //==============================END OF HANDLE CHECKOUT STUFF==================

  //===========================HANDLE LOADING STUFF=================
  popupWindowOpen = false;
  isLoading = true;
  receiveDataFromChild(data: string) {
    console.log('Dữ liệu nhận được từ component con:', data);
    this.router.navigate(['/amdin']);
    this.popupWindowOpen = false;
  }
  //===========================END OF HANDLE LOADING STUFF=================
  // // Ví dụ: Di chuyển đến bước trước đó
  // this.stepper.previous();

  // // Ví dụ: Di chuyển đến một bước cụ thể
  // this.stepper.selectedIndex = 2;

  ngOnInit(): void {
    console.log('void called', JSON.parse(localStorage.getItem('card')!));

    if (this.Steps[0]) {
      this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
      this.route.queryParams.subscribe((queryParams) => {
        this.query = queryParams['q'];

        this.setDataWithPageIndex(this.pageIndex, this.itemInPage);
      });
    }
  }
}
