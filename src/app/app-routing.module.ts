import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/page/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product/:id',
    loadChildren: ()=> import('./modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'cart',
    loadChildren: ()=> import('./modules/saved-items/saved-items.module').then(m => m.SavedItemsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
