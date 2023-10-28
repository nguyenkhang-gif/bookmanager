import { Component, Input, OnInit, booleanAttribute } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  list: Book[] = []
  ogList: Book[] = []
  pageNum: number = 1
  pageIndex: number = 1
  itemInPage:number=8
  itemsToRepeat = new Array(0)
  query: string = ''
  catid?:number =0

  constructor(
    private service: BookServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  

  isSpecificUrl(url: string): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes(`/${url}`);
  }


  handleNextBefore(method:string){
    if(method=="+"&&this.list.length){
      
      this.pageIndex++
      this.setDataWithPageIndex(this.pageIndex,this.itemInPage)
    }
    if(method=="-"&&this.pageIndex>1){
      this.pageIndex--
      this.setDataWithPageIndex(this.pageIndex,this.itemInPage)
    }

  }

  setDataWithPageIndex(pageIndex: number, pageSize: number){

    if((this.query == null || this.query == '') && this.catid != 0&& this.catid!=null){
      console.log('handle only catid:',this.catid);
      this.service.getBookWithPageIndexPageSizeCatId(pageIndex,pageSize,this.catid).subscribe({
        next: (list) => {
          // console.log(list);
          this.list = list;
       
        },
      })
    }
    else if (this.query != null && (this.catid == 0||this.catid == null)){
      // console.log('handle catid:',this.catid);
      console.log('handle query only:',this.query);
      this.service.getBookWithPageIndexPageSizeCatIdContent(pageIndex,pageSize,0,this.query).subscribe({
        next: (list) => {
          // console.log(list);
          this.list = list;
       
        },
      })


    }
    else if(this.query != null && this.query != ''&& (this.catid != 0&&this.catid != null)){
      console.log("handle query and cat");
      console.log("handle  catid:",this.catid);
      console.log("handle query :",this.query);
      console.log("handle pageindex :",this.pageIndex);
      this.service.getBookWithPageIndexPageSizeCatIdContent(pageIndex,pageSize,this.catid,this.query).subscribe({
        next: (list) => {
          console.log(list);
          this.list = list;
       
        },
        error:(e)=>{
          console.log(e);
          
        }
      })
    }
    else{
      this.service
      .getBookWithIndexPageAndPageSize(pageIndex, pageSize)
      .subscribe({
        next: (list) => {
          console.log(list);
          this.list = list;
       
        },
       
      });
    }
    console.log('query:',this.query==null)
    console.log('cat:',this.catid==null)
   

    
  }

  
  getDataWithQuery(query: string, catid: number) {
    if ((query == null || query == '') && catid != 0) {
      this.service.getBookWithCatId(catid).subscribe({
        next: (data) => {
          this.list = data
          this.ogList = data;//chỉ để lấy số lượng item 
        
          this.pageNum = Math.ceil(this.ogList.length / 4);
          this.itemsToRepeat = new Array(this.pageNum);
          this.setDataWithPageIndex(1, 4);
          // console.log('query none')
          // console.log('cat :',this.catid)
        },
      });
      
    }
    if (query != null && catid != 0) {
      this.service.getBookWithCatIdAndContent(catid, query).subscribe({
        next: (data) => {
          this.list = data
          // console.log('query :',this.query)
          // console.log('cat :',this.catid)
        },
      });
    }
    if (this.query != null && (this.catid == 0||this.catid == null)){
      console.log("handle getDate with query only:", this.query)
    }

  }

  ngOnInit(): void {
    // this.pageIndex=1
    //get the fk query
    this.route.queryParams.subscribe((queryParams) => {
      // console.log("this is route for query");
      this.query = queryParams['q'];
      this.catid = queryParams['cat'];
      // console.log("query:",this.query)
      // this.getDataWithQuery(this.query, this.catid ? this.catid : 0);
      this.setDataWithPageIndex(this.pageIndex,this.itemInPage)
    });
    // console.log(this.query)
    if (!this.isSpecificUrl('search')) this.setDataWithPageIndex(1,this.itemInPage);
  }
}
