import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo?: User;
  userForm: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      id: [null], // You can set initial values or use null
      username: ['', Validators.required], // Add any necessary validators
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      PasswordHash: [null], // You can set initial values or use null
      PasswordSalt: [null], // You can set initial values or use null
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      // address: [''],
    });
  }

  handleSaveChange() {
    if (this.userInfo != null) {
      this.userInfo.id = this.userForm.value.id;
      this.userInfo.username = this.userForm.value.username;
      this.userInfo.email = this.userForm.value.email;
      this.userInfo.firstName = this.userForm.value.FirstName;
      this.userInfo.lastName = this.userForm.value.LastName;
      this.userInfo.phone_number = this.userForm.value.phone_number;

      console.log("USER:",this.userInfo);
      this.userService.editInfo(this.userInfo).subscribe({
        next: (item) => {
          console.log(item);
        },
        error:(e)=>{
          console.log("error: ",e);
          
        }
      });
    }
  }

  getUser(userId: any) {
    this.userService.getUser(userId).subscribe((item) => {
      this.userInfo = item;
      this.userForm.patchValue({
        id: item.id,
        username: item.username,
        email: item.email,
        FirstName: item.firstName,
        LastName: item.lastName,
        phone_number: item.phone_number,
        // Set values for other fields as needed
      });
      console.log(item);
    });
  }
  //lấy user
  getUserInfo() {
    this.userService.getMe().subscribe({
      next: (item) => {
        this.getUser(item);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }
}
