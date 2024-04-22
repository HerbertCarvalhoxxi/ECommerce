import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsEnum } from 'src/app/models/enum/enum';
import { Product } from 'src/app/models/interfaces/getAllProducts';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public productsDatas: Product[] = []
  private readonly destroy$: Subject<void> = new Subject()
  public enum = ProductsEnum
  public searchQuery: string = ''
  public length!: number
  public filtedList: Product[] = []

  ngOnInit(): void {
    this.getAllProducts()
  }

  constructor( private getProducts: ProductsService ){}

  getAllProducts() {
    this.getProducts.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (r)=>{
        this.productsDatas = r.data.allProducts
        this.filtedList = this.productsDatas
        this.length = this.filtedList.length
      },
      error: (e) => {
        console.log(e)
      }
  })
  }

  getAllTshirts() {
    this.getProducts.getAllTshirts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (r)=> {
        this.filtedList = r.data.allProducts
        this.length = this.filtedList.length
      }
    })
  }

  getAllMugs() {
    this.getProducts.getAllMugs().pipe(takeUntil(this.destroy$)).subscribe({
      next: (r)=> {
        this.filtedList = r.data.allProducts
        this.length = this.filtedList.length
      }
    })
  }

  filter(action: string){
    if (action === this.enum.HIGHTEST_VALUE){
    this.filtedList = this.filtedList.sort((a, b) => b.price_in_cents - a.price_in_cents)
    }

    else if (action === this.enum.LOWEST_VALUE){
      this.filtedList = this.filtedList.sort((a, b) => a.price_in_cents - b.price_in_cents)
    }
    else if (action === this.enum.BESTSELLERS){
      this.filtedList = this.filtedList.sort((a, b) => b.sales - a.sales)
    }
    else if (action === this.enum.NEWS_ENUM){
       this.filtedList = this.filtedList.sort((a, b) => {
        const dataA = new Date(a.created_at);
        const dataB = new Date(b.created_at);
        return dataB.getTime() - dataA.getTime();
    });
      }
    }

    onSearchChange(query: string): void {
      this.searchQuery = query;
      this.filtedList = this.productsDatas.filter((products)=>
      products.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }

    ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
    }

  }

