import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './page/product/product.component';
import { PRODUCT_ROUTER } from './product.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardItemsPipe } from '../home/components/card-items/card-items.pipe';

@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCT_ROUTER),
    SharedModule,

  ],
  providers: [CardItemsPipe]
})
export class ProductModule { }
