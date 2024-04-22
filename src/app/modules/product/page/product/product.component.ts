import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/interfaces/getAllProducts';
import { SaveProduct } from 'src/app/models/interfaces/saveProduct';
import { ProductsService } from 'src/app/services/products.service';
import { CartComponent } from 'src/app/shared/header/components/cart/cart.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public productDatas: Product[] = []
  public id: any = ''
  private readonly destroy$: Subject<void> = new Subject()

  ngOnInit(){
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe({
      next: (r)=> {
        this.id = r.get('id' as string)
        this.getDatas(this.id)
      }
    })
  }

  getDatas(id: string) {
    this.services.getProduct(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (r)=> {
        this.productDatas = r.data.allProducts

      }
    })
  }

  saveProduct(saveProduct: SaveProduct){
    this.services.addItemToCart(saveProduct)
  }

  navigate(){
    this.router.navigate([`/`])
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  constructor(private route: ActivatedRoute, private services: ProductsService, private update: CartComponent, private router: Router){}
}
