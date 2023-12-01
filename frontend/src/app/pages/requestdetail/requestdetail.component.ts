import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requestdetail',
  templateUrl: './requestdetail.component.html',
  styleUrls: ['./requestdetail.component.scss'],
})
export class RequestdetailComponent implements OnInit {
  constructor(
    private bookService: BookServiceService,
    private router: Router,
    private imageService: ImageService,
    private checkoutService: CheckoutService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.dateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  // ==================DATA AND VARIABLE
  allDataDone = false;
  checkoutInfo?: any;
  dateForm: FormGroup;
  booklist: any[] = [];
  // ==================END OF DATA AND VARIABLE
  getSafeImageUrl(data: any) {
    return this.imageService.getSafeImageUrl(data);
  }
  getIdcode(id: any) {
    return this.imageService.convertToPaddedString(id);
  }
  // ========================LOAD DATA STUFF
  loadData() {
    this.allDataDone = false;
    this.checkoutService
      .getWithId(this.router.url.split('/')[3])
      .subscribe((checkoutData) => {
        // console.log(checkoutData);
        this.checkoutInfo = checkoutData;
        console.log(this.checkoutInfo);
        
        this.selectedValue=this.checkoutInfo.isDone.toString()
        console.log(this.checkoutInfo.isDone == 0);

        console.log(
          this.imageService.convertDateString(this.checkoutInfo.ngaymuon)
        );
        console.log(
          this.imageService.convertDateString(this.checkoutInfo.endDate)
        );

        this.dateForm?.patchValue({
          startDate: this.imageService.convertDateString(
            this.checkoutInfo.ngaymuon
          ),
          endDate: this.imageService.convertDateString(
            this.checkoutInfo.ngaytra
          ),
        });
        this.userService
          .getUser(this.checkoutInfo.userid)
          .subscribe((userInfo) => {
            console.log(userInfo);
            this.checkoutInfo.user = userInfo;
          });
        this.checkoutService
          .getWithCheckOutId(this.checkoutInfo.id)
          .subscribe((allbook) => {
            console.log(allbook);
            this.booklist = allbook;
            this.booklist.forEach((book, index) => {
              console.log(book);
              this.bookService
                .getBookWithId(book.sachid)
                .subscribe((bookDetail) => {
                  console.log(bookDetail);
                  book.sach = bookDetail;
                  console.log(book);
                  this.allDataDone = true;
                });
            });
          });
      });
  }
  // ========================END OF LOAD DATA STUFF

  // =================HANDLE SAVE ALL============
  handleSaveAll() {
    this.popupWindowOpen = true;
    this.isLoading = true;
    console.log(this.dateForm.get('startDate')?.value.toString());
    console.log(this.dateForm.get('endDate')?.value.toString());
    this.checkoutInfo.ngaymuon = this.imageService.convertDateString(
      this.dateForm.get('startDate')?.value.toString()
    );
    this.checkoutInfo.ngaytra = this.imageService.convertDateString(
      this.dateForm.get('endDate')?.value.toString()
    );

    console.log(this.checkoutInfo);

    this.checkoutService.update(this.checkoutInfo).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.log(e);
        this.isLoading = false;
        console.log('handle loading');
      },
    });
  }
  // =================HANDLE SAVE ALL============

  //==================HANDLE CHANGE VALUE OF STATUS
  selectedValue:any;
  handleChangeStatus(value:any) {
    // console.log(value);
    this.checkoutInfo.isDone = value;
    this.selectedValue=value.toString()
    console.log(parseInt(this.selectedValue));
    
    
  }
  //==================END OF HANDLE CHANGE VALUE OF STATUS

  //=========================HANDLE SHOW BOOKID
  convertBookId(id: any) {
    return this.imageService.convertToPaddedString(id);
  }

  //========================= END OF HANDLE SHOW BOOKID

  //========================================handle delete

  deleteId?: any;
  openConfirm = false;
  handleDelete(id: any) {
    console.log(id);
    this.deleteId = id;
    this.openConfirm = true;
  }

  confirmDelete() {
    console.log(this.deleteId);

    this.checkoutService.deleteRequestWithId(this.deleteId).subscribe({
      next: (data) => {
        console.log(data);
        this.booklist = this.deleteItemById(this.booklist, this.deleteId);
      },
      error: (e) => {
        this.booklist = this.deleteItemById(this.booklist, this.deleteId);
        console.log(e);
      },
    });
    this.openConfirm = false;
  }
  cancelDelete() {
    this.openConfirm = false;
  }

  deleteItemById(array: any[], idToDelete: number): any[] {
    return array.filter((item) => item.id !== idToDelete);
  }
  //========================================END OF handle delete

  // ==============HANDLE LOADING
  isBorrow = false;
  popupWindowOpen = false;
  isLoading = true;
  receiveDataFromChild(data: string) {
    console.log('Dữ liệu nhận được từ component con:', data);
    this.popupWindowOpen = false;
    this.router.navigate(["admin/allrequest"])
  }

  // ==============END OF HANDLE LOADING

  // ========================FORM DATE HANDLE
  getcurentDate() {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 7);
    this.dateForm?.patchValue({
      startDate: currentDate,
      endDate: endDate,
    });
    //
  }

  // ========================FORM DATE HANDLE

  ngOnInit(): void {
    console.log('on route', this.router.url.split('/')[3]);
    this.loadData();
  }
}
