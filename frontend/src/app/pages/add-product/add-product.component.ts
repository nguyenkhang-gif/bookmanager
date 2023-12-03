import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/models/Book';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthorService } from 'src/app/services/author.service';
import { Publisher } from 'src/app/models/Publisher';
import { interval } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';
import { checkout } from 'src/app/models/checkout';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CategoryService } from 'src/app/services/category.service';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private authorService: AuthorService,
    private userService: UserService,
    private bookService: BookServiceService,
    private route: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private checkoutService: CheckoutService,
    private snackbarService: SnackbarService,
    private catService: CategoryService,
    private publisherService: PublisherService
  ) {}
  // bookForm: FormGroup;
  bookForm = this.formBuilder.group({
    chieudai: [],
    chieurong: [],
    chudeid: [],
    borrowCount: [],
    dinhdang: [],
    dongia: [],
    hinhanh: [],
    nhaxuatbanid: [],
    soluong: [],
    sotrang: [],
    tacgiaid: [],
    tentacgia: [],
    tensach: [],
    duocMuon: [],
    chude: [''],
  });
  // CÁC BIÊN`
  bookInfo?: Book;
  imgurl?: any;
  category?: any = null;
  catList: any[] = []; //list
  author?: any;
  authorList: any[] = []; //list
  producerInfo?: any;
  producerInfoList: any[] = []; //list the loai
  isBorrow = false;
  popupWindowOpen = false;
  isLoading = true;

  // END OF CÁC BIÊN`

  // =======HANDLE TỰ ĐỘNG CẬP NHẬT LƯỢT MƯỢN===========
  handleAutoFillBorrowCount() {
    let dataList: any[] = [];
    let total = this.checkoutService
      .getwithBookId(this.route.url.split('/')[3])
      .subscribe((res) => {
        console.log(res);
        dataList = res;
      });
  }
  // =======END OF HANDLE TỰ ĐỘNG CẬP NHẬT LƯỢT MƯỢN==============

  loaddata(url: any) {
    this.bookService.getBookWithId(url).subscribe({
      next: (book) => {
        // this.bookInfo = book;
        console.log('book:', book);

        if (book.duocMuon == 1) {
          this.isBorrow = true;
        } else {
          this.isBorrow = false;
        }
        console.log(this.bookForm);
        this.bookInfo = book;
        // ==== lấy cat

        this.bookService.getCatgory(book.chudeid).subscribe({
          next: (cat) => {
            console.log(cat);
            this.category = cat;
            this.bookForm.get('chude')?.setValue(cat.tenchude);
          },
        });
        // ======== end of lấy cat
        //============ lấy tác giả
        this.authorService
          .getAuthorWithBookId(book.tacgiaid)
          .subscribe((auth) => {
            console.log(auth);
            this.author = auth;
          });

        // ===============end  of lấy tác giả

        this.bookService.getProducer(book.nhaxuatbanid).subscribe({
          next: (producer) => {
            console.log(producer);

            this.producerInfo = producer;
          },
        });
      },
    });
  }

  //==========================START OF CATERGORY=========================================
  changeCat(item: Category) {
    this.category = item;
    // this.bookForm.get('chudeid')?.setValue(item.id)
  }
  //==========================END OF CATERGORY=========================================

  //==========================START OF AUTHOR=========================================
  changeAuthor(item: any) {
    this.author = item;
  }
  //==========================END OF AUTHOR=========================================
  // ======================START OF PRODUCER=================================
  changeProducer(item: any) {
    this.producerInfo = item;
  }
  // ======================END OF PRODUCER=================================

  // =====================START OF BORROW==============
  canBorrow() {
    this.isBorrow = true;
    console.log('can borrow', this.isBorrow);
  }
  canNotBorrow() {
    this.isBorrow = false;
    console.log('can not borrow', this.isBorrow);
  }

  // =====================END OF BORROW================

  //=======================handle pop up window======================
  receiveDataFromChild(data: string) {
    console.log('Dữ liệu nhận được từ component con:', data);
    this.popupWindowOpen = false;
  }

  //=======================end of handle pop up window======================

  //======================START OF UPLOAD IMG================================
  selectedFile: File | null = null;
  imageData: string | null = null;
  imageUrl: string | null = null;

  loadImge() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        console.log(this.imageUrl);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;

    console.log(this.selectedFile);
    if (this.selectedFile) {
      this.imageService.convertToBase64(this.selectedFile, (base64String) => {
        console.log(base64String);
        console.log(this.bookInfo == null);
        this.imageData = base64String;
        if (this.bookInfo) {
          this.bookInfo.imageData = base64String;
          console.log(this.bookInfo?.imageData);
        }
        // Ở đây, bạn có thể thực hiện các hành động khác với base64String
      });
    }

    // this.loadImge();
  }

  getImage(userid: any): void {
    this.bookService.getImage(userid).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // reader.result chứa dữ liệu ảnh dưới dạng base64
          console.log('getimage called');

          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      (error) => {
        console.error('Error getting image', error);
      }
    );
  }
  onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Gọi API để lưu ảnh
    this.http
      .post(
        `http://localhost:5280/Dbosach/UploadFile/${
          this.route.url.split('/')[3]
        }`,
        formData
      )
      .subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.loadImge();
          this.loadAllData();
        },
        error: (error) => {
          console.error('Error uploading file', error);
        },
      });
  }

  //======================START OF UPLOAD IMG================================

  // ==============================HANDLE SUBMIT ALL============================
  saveAllForm() {
    // console.log({
    //   chieudai: this.bookForm.get('chieudai')?.value,
    //   chieurong: this.bookForm.get('chieurong')?.value,
    //   chudeid: this.category?.id,
    //   borrowCount: this.bookForm.get('borrowCount')?.value,
    //   dinhdang: 'PDF',
    //   dongia: 100,
    //   // borrowCount:0,
    //   hinhanh: 'sach 1.jeg',
    //   nhaxuatbanid: this.producerInfo?.id,
    //   soluong: this.bookForm.get('soluong')?.value,
    //   sotrang: this.bookForm.get('sotrang')?.value,
    //   tacgiaid: this.author?.id,
    //   tensach: this.bookForm.get('tensach')?.value,
    //   duocMuon: this.isBorrow == true ? 1 : 0,
    //   imageData: this.imageData,
    // });

    this.bookService
      .insertBook({
        chieudai: this.bookForm.get('chieudai')?.value,
        chieurong: this.bookForm.get('chieurong')?.value,
        chudeid: this.category?.id,
        borrowCount: this.bookForm.get('borrowCount')?.value,
        dinhdang: 'PDF',
        dongia: 100,
        hinhanh: 'sach 1.jeg',
        nhaxuatbanid: this.producerInfo?.id,
        soluong: this.bookForm.get('soluong')?.value,
        sotrang: this.bookForm.get('sotrang')?.value,
        tacgiaid: this.author?.id,
        tensach: this.bookForm.get('tensach')?.value,
        duocMuon: this.isBorrow == true ? 1 : 0,
        imageData: this.imageData,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.log(e);
        },
      });

    // console.log(this.bookInfo);
  }
  // ============================== END OF HANDLE SUBMIT ALL=====================
  getSafeImageUrl(base64: any): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  loadAllData() {
    this.loaddata(this.route.url.split('/')[3]);
    this.loadAllCat();
    this.loadAllPub();
    // this.loadImge();
    // this.getImage(this.route.url.split('/')[3]);
    this.authorService.getAllAuthtor().subscribe((item) => {
      console.log(item);
      this.authorList = item;
    });
  }

  // ============================HANDLE ADD AUTHOR
  authorToAdd: any = '';
  auhtorToEdit: any;
  handleAddAuthor() {
    console.log(this.authorToAdd);
    this.authorService.insert({ tentacgia: this.authorToAdd }).subscribe({
      next: (data) => {
        this.snackbarService.showSuccess('add thành công 2 ????');
        this.authorService.getAllAuthtor().subscribe((item) => {
          console.log(item);
          this.authorList = item;
        });
        this.authorToAdd = '';
        console.log(data);
      },
      error: (e) => {
        this.snackbarService.showSuccess('add thành công ????');
        console.log(e);
      },
    });
  }

  // ============================END OF HANDLE ADD AUTHOR
  // ============================HANDLE ADD cat
  catToAdd: any = '';
  catToEdit: any;
  handleAddCat() {
    console.log(this.catToAdd);

    this.catService.insert({ tenchude: this.catToAdd }).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        this.snackbarService.showSuccess('add thành công');
        this.loadAllCat();
      },
    });
  }
  startEditCat(item: any) {
    this.popupWindowTitle = 'Edit chủ đề';
    this.popupWindowLabel = 'Tên chủ đề';
    this.editType = 'cat';
    this.catToEdit = item;
    this.editContent = item.tenchude;
    this.openFullscreen = true;
    this.openPopupWinDow = true;
  }

  editCat(item: any) {
    item.tenchude = this.editContent;
    this.catService.update(item).subscribe({
      next: (data) => {
        console.log(data);
        this.snackbarService.showSuccess('edit thành CÔng!!!');
      },
      error: (e) => {
        console.log(e);
        this.snackbarService.showSuccess('edit thành CÔng!!!');
        // this.editContent=''
      },
    });
    // chưa có service rỏ ráng cho cat
  }
  handleDeleteCat(item: any) {
    this.catService.delete(item.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        this.snackbarService.showSuccess('Xóa thành công');
        this.loadAllCat();
      },
    });
  }

  // ============================END OF HANDLE ADD cat

  // =============HANDLE mở popu winddow
  openFullscreen = false;
  openPopupWinDow = false;
  popupWindowTitle = 'Edit';
  popupWindowLabel = 'Edit';
  editContent = 'Something';
  editType = '';

  closePopupWin() {
    this.popupWindowTitle = 'Edit';
    this.popupWindowLabel = 'Edit';
    this.editContent = 'Something';
    this.openFullscreen = false;
    this.openPopupWinDow = false;
  }

  // =============end of HANDLE mở popu winddow

  // ============edit and delete auhtor=============

  startEditAuthor(item: any) {
    this.popupWindowTitle = 'Edit Tác Giả';
    this.popupWindowLabel = 'Tên Tác Giả';
    this.editType = 'author';
    this.auhtorToEdit = item;
    this.editContent = item.tentacgia;
    this.openFullscreen = true;
    this.openPopupWinDow = true;
  }

  editAuthor(item: any) {
    console.log(item);
    item.tentacgia = this.editContent;
    this.authorService.update(item).subscribe({
      next: (data) => {
        console.log(data);
        this.snackbarService.showSuccess('edit thành CÔng!!!');
      },
      error: (e) => {
        console.log(e);
        this.snackbarService.showSuccess('edit thành CÔng!!!');
      },
    });
  }
  handleDeleteAuthor(item: any) {
    this.authorService.delete(item.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        this.snackbarService.showSuccess('Xóa thành công');
        this.authorService.getAllAuthtor().subscribe((item) => {
          console.log(item);
          this.authorList = item;
        });
      },
    });
  }
  // ============end of edit and delete auhtor=============

  // =====================Publisher
  pubToAdd = '';
  pubToEdit: any;
  startEditPub(item: any) {
    this.popupWindowTitle = 'Edit Nhà Xuất Bản';
    this.popupWindowLabel = 'Tên Nhà Xuất Bản';
    this.editType = 'publisher';
    this.pubToEdit = item;
    this.editContent = item.tennhaxuatban;
    this.openFullscreen = true;
    this.openPopupWinDow = true;
  }

  handleAddPub() {
    console.log(this.pubToAdd);
    this.publisherService.insert({ tennhaxuatban: this.pubToAdd }).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        this.snackbarService.showSuccess('add thành công');
        this.loadAllPub();
      },
    });
  }

  editPub(item: any) {
    item.tennhaxuatban = this.editContent;
    this.publisherService.update(item).subscribe({
      next: (data) => {
        console.log(data);
        // this.snackbarService.showSuccess('edit thành CÔng!!!');
      },
      error: (e) => {
        console.log(e);
        this.snackbarService.showSuccess('edit thành CÔng!!!');
        this.loadAllPub();
      },
    });
  }
  handleDeletePub(item: any) {
    this.publisherService.delete(item.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.log(e);
        this.snackbarService.showSuccess('Xóa thành công');
        this.loadAllPub();
      },
    });
  }

  // =====================end of Publisher

  //=========save all edit

  // ==================REFACTOR THE GET DATA FUNCTION
  loadAllCat() {
    this.bookService.getAllCatgory().subscribe((list) => {
      console.log(list);
      this.catList = list;
      console.log(this.catList);
    });
  }

  loadAllPub() {
    this.bookService.getAllProducer().subscribe((list) => {
      console.log(list);
      this.producerInfoList = list;
    });
  }
  // ==================END OF REFACTOR THE GET DATA FUNCTION
  // =====handk
  saveEdit() {
    if (this.editType == 'author') this.editAuthor(this.auhtorToEdit);
    if (this.editType == 'cat') this.editCat(this.catToEdit);
    if (this.editType == 'publisher') this.editPub(this.pubToEdit);
  }
  ngOnInit(): void {
    this.loadAllData();

    // interval(2000).subscribe(() => {
    //   // this.nextSlide()
    //   // console.log("done!!");
    //   this.isLoading = true;

    // });
  }
}
