import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, filter } from 'rxjs';
import { ProductResponse } from '../models/interfaces/getAllProducts';
import { SaveProduct } from '../models/interfaces/saveProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public API_URL = environments.API_URL
  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<ProductResponse>{
    const query = `
      {
        allProducts {
          id
          name
          price_in_cents
          image_url
          sales
          created_at
          category
          description
        }
      }
    `;
    return this.httpClient.post<ProductResponse>(
      this.API_URL,
      {query},
    )
  }

  getProduct(id: string): Observable<ProductResponse>{
    const query = `
    {
    allProducts(filter: {id: "${id}"}){
      id
      name
      price_in_cents
      image_url
      sales
      created_at
      category
      description
    }
  }`
  return this.httpClient.post<ProductResponse>(
    this.API_URL,
    {query},
  )
  }

  getAllTshirts(): Observable<ProductResponse>{
    const query = `
    {
      allProducts(filter: {category: "t-shirts"}){
        id
        name
        price_in_cents
        image_url
        sales
        created_at
        category
        description
      }
    }`
    return this.httpClient.post<ProductResponse>(
      this.API_URL,
      {query}
    )
  }

  getAllMugs(): Observable<ProductResponse>{
    const query = `
    {
      allProducts(filter: {category: "mugs"}){
        id
        name
        price_in_cents
        image_url
        sales
        created_at
        category
        description
      }
    }`
    return this.httpClient.post<ProductResponse>(
      this.API_URL,
      {query},
    )
  }

  private updateCartItemsCount(): void {
    const myList: any = localStorage.getItem('@cartItems');
    const cartItems = JSON.parse(myList) || [];
    this.cartItemsSubject.next(cartItems.length);
  }

  private saveCartItems(cartItems: any[]): void {
    localStorage.setItem('@cartItems', JSON.stringify(cartItems));
    this.updateCartItemsCount();
  }

  addItemToCart(product: any): void {
    const myList: any = localStorage.getItem('@cartItems');
    let cartItems = JSON.parse(myList) || [];

    const hasItem = cartItems.some((item: any) => item.id === product.id);

    if (hasItem) {
      console.log("Este produto já está no carrinho.");
      return;
    }

    cartItems.push(product);
    this.saveCartItems(cartItems);
  }

  deleteItems(id: string): Observable<Array<SaveProduct>>{
    const myList: any = localStorage.getItem("@cartItems")
    let cartItems = JSON.parse(myList) || []
    let filted = cartItems.filter((item: any)=>{
      return item.id !== id
    })
    localStorage.setItem("@cartItems", JSON.stringify(filted))
    this.cartItemsSubject.next(filted.length)
    return of(filted)
  }

  getCartItems(): Observable<Array<SaveProduct>>{
    const myList: any = localStorage.getItem('@cartItems')
    let cartItems = JSON.parse(myList) || []
    return of(cartItems)
  }
}
