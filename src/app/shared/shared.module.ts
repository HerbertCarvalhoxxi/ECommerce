import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './header/components/cart/cart.component';
import { CardItemsPipe } from '../modules/home/components/card-items/card-items.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    CartComponent,
    CardItemsPipe,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  exports: [HeaderComponent, CardItemsPipe ]

})
export class SharedModule { }
