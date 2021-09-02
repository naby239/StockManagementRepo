import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap/pagination'



@NgModule({
  declarations: [TextInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule.forRoot()    
  ],
  exports:[
    TextInputComponent,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class SharedModule { }
