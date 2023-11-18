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

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.scss'],
})
export class AdminProductDetailsComponent implements OnInit {
  constructor(
    private authorService: AuthorService,
    private userService: UserService,
    private bookService: BookServiceService,
    private route: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  // bookForm: FormGroup;
  bookForm = this.formBuilder.group({
    chieudai: [null],
    chieurong: [null],
    chudeid: [null],
    borrowCount: [null],
    dinhdang: [null],
    dongia: [null],
    hinhanh: [null],
    nhaxuatbanid: [null],
    soluong: [null],
    sotrang: [null],
    tacgiaid: [null],
    tentacgia: [null],
    tensach: [null],
    duocMuon: [null],
    chude: [''],
  });
  // CÁC BIÊN`
  bookInfo?: Book;
  imgurl?: any;
  category?: any;
  catList: any[] = []; //list
  author?: any;
  authorList: any[] = []; //list
  producerInfo?: any;
  producerInfoList: any[] = []; //list the loai
  isBorrow = false;
  popupWindowOpen = true;
  isLoading = false;

  // END OF CÁC BIÊN`
  loadBookData(book: any): void {
    this.bookForm.patchValue({
      chieudai: book.chieudai,
      chieurong: book.chieurong,
      chudeid: book.chudeid,
      borrowCount: book.borrowCount,
      dinhdang: book.dinhdang,
      dongia: book.dongia,
      hinhanh: book.hinhanh,
      nhaxuatbanid: book.nhaxuatbanid,
      soluong: book.soluong,
      sotrang: book.sotrang,
      tacgiaid: book.tacgiaid,
      tensach: book.tensach,
      duocMuon: book.duocMuon,
    });
  }
  loaddata(url: any) {
    this.bookService.getBookWithId(url).subscribe({
      next: (book) => {
        // this.bookInfo = book;
        console.log('book:', book);
        this.loadBookData(book);
        if (book.duocMuon == 1) {
          this.isBorrow = true;
        } else {
          this.isBorrow = false;
        }
        console.log(this.bookForm);

        this.imgurl = `../../../assets/books/${book.hinhanh}`;
        this.bookService.getImage(url).subscribe(
          (data: Blob) => {
            console.log(data);

            const reader = new FileReader();
            reader.onloadend = () => {
              // reader.result chứa dữ liệu ảnh dưới dạng base64
              this.bookInfo = book;
              this.imageData = reader.result as string;
              console.log(this.imageData);

              this.bookInfo.hinhanh = reader.result as string;
            };
            reader.readAsDataURL(data);
          },
          (error) => {
            console.error('Error getting image', error);
          }
        );
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
  changeCat(item: any) {
    this.category = item;
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
    this.popupWindowOpen=false
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
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.loadImge();
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
        },
        error: (error) => {
          console.error('Error uploading file', error);
        },
      });
  }

  //======================START OF UPLOAD IMG================================

  ngOnInit(): void {
    this.loaddata(this.route.url.split('/')[3]);
    this.bookService.getAllCatgory().subscribe((list) => {
      console.log(list);
      this.catList = list;
    });
    // this.loadImge();
    this.getImage(this.route.url.split('/')[3]);
    this.authorService.getAllAuthtor().subscribe((item) => {
      console.log(item);
      this.authorList = item;
    });
    this.bookService.getAllProducer().subscribe((list) => {
      console.log(list);
      this.producerInfoList = list;
    });




    interval(2000).subscribe(() => {
        // this.nextSlide()
        // console.log("done!!");
        this.isLoading=true
        
        // this.sendEventToChild()
        // Đây là nơi bạn đặt code cần thực thi mỗi giây
      });
  }
}
