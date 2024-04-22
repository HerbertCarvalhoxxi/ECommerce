import { Component, EventEmitter, Output } from '@angular/core';
import { HomeComponent } from '../../page/home/home.component';
import { ProductsEnum } from 'src/app/models/enum/enum';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  public filter: string = 'allProducts'
  public showFilters: boolean = false
  @Output() productAction = new EventEmitter<string>
  public enum = ProductsEnum

  constructor ( public homeComp: HomeComponent ) {}

  setFilter(filter : string): void {
    this.filter = filter
  }

  setShowFilter(){
    this.showFilters = !this.showFilters
  }

  handleProductEvent(action: string) {
    this.productAction.emit(action)
  }
}
