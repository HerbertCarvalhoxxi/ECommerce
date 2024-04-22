import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedItemsComponent } from './page/saved-items/saved-items.component';
import { RouterModule } from '@angular/router';
import { SAVED_ROUTER } from './saved-items.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShortenPipe } from './shorten.pipe';



@NgModule({
  declarations: [
    SavedItemsComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SAVED_ROUTER),
    SharedModule,
  ]
})
export class SavedItemsModule { }
