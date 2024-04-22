import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SaveProduct } from 'src/app/models/interfaces/saveProduct';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss']
})
export class SavedItemsComponent implements OnInit, OnDestroy {
  public productDatas!: SaveProduct[]
  public subTotalValue!: number
  public total: number = 0
  public screenWidth!: number;
  private readonly destroy$: Subject<void> = new Subject()

  ngOnInit(): void {
    this.getProducts()
    this.subTotal()
  }

  getProducts() {
    this.service.getCartItems().pipe(takeUntil(this.destroy$)).subscribe({
      next: (r)=>{
        this.productDatas = r
      }
    })
  }

  deleteProduct(id: string) {
    this.service.deleteItems(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (r)=> {
        this.productDatas = r
        this.subTotal()
      }
    })
  }

  subTotal(){
    this.getProducts()
    this.total = 0
    for(let i = 0; i < this.productDatas.length; i++){
      this.total = this.total + (this.productDatas[i].price_in_cents * this.productDatas[i].amount)
      this.subTotalValue = this.total
    }
    this.subTotalValue = this.subTotalValue
  }

  editAmount(id: string) {
    const myList: any = localStorage.getItem("@cartItems")
    let list = JSON.parse(myList) || []
    let updatedList = []
     for(let i = 0; i < list.length; i++) {
      if(list[i].id === id) {
        updatedList[i] = list[i].amount += 1
      }
      updatedList[i] = list[i]
    }
    console.log(updatedList)
    localStorage.setItem("@cartItems", JSON.stringify(updatedList))
    this.subTotal()
  }

  navigate() {
    this.router.navigate(['/'])
  }

  navigateToProduct(id: string) {
    this.router.navigate([`product/${id}`])
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  constructor(private service: ProductsService, private router: Router){
    this.screenWidth = window.innerWidth;
  }

}
