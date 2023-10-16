import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from "@angular/material/toolbar"
import { MatIconModule} from "@angular/material/icon"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {FormsModule} from '@angular/forms';

const MaterialComponents=[
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule
]

@NgModule({
  declarations: [],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }
