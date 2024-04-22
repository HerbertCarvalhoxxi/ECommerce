import { Component, Injectable, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  public cartItems: number = 0

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((count) => {
      this.cartItems = count;
      this.getItems()
    });
  }

  getItems(): void {
    let myList: any = localStorage.getItem('@cartItems')
    let cartLength = JSON.parse(myList)
    cartLength?.length == null ? this.cartItems = 0 :  this.cartItems = cartLength?.length
  }

  constructor (private cartService: ProductsService) {}



}
