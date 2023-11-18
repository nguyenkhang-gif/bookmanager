import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.scss'],
})
export class PopupWindowComponent {
  //error done and finish
  @Input() isDone: boolean = false;
  @Output() sendDataToParent = new EventEmitter<any>();
  // blur = '';

  sendToParent() {
    const data = 'close';
    this.sendDataToParent.emit(data);
  }
  ngOnChanges() {
    console.log('Received data from parent:', this.isDone);

    // Xử lý dữ liệu từ component cha ở đây
  }
}
