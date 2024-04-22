import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/interfaces/getAllProducts';

@Component({
  selector: 'app-card-items',
  templateUrl: './card-items.component.html',
  styleUrls: ['./card-items.component.scss']
})
export class CardItemsComponent {
  @Input() productsDatasInput: Product[] = []
  public crrntPage: number = 1
  public itemsPrPage: number = 12
  @Input() totalItems!: number
  
  constructor(private router: Router){}

  navigate(id: string){
    this.router.navigate([`product/${id}`])
  }
}
