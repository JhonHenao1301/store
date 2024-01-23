import { Component, Input, inject, signal } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { Product } from '@shared/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {

  private cartService = inject(CartService)
  private productService = inject(ProductService)

  productChosen = signal<Product | null>(null)
  cover = signal('')
  @Input() id?: string;

  ngOnInit() {
    if(this.id){
      this.productService.getOne(this.id)
      .subscribe({
        next: (product) => {
          this.productChosen.set(product)
          if(product.images.length > 0) {
            this.cover.set(product.images[0])
          }
        }
      })
    }
  }

  changeCover(idImg: string) {
    this.cover.set(idImg)
  }

  addToCart() {
    const product = this.productChosen()
    if(product) {
      this.cartService.addToCart(product)
    }
  }

  symbolSearched:string = "]"
}
