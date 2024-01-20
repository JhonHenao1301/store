import { Component, inject, signal, Input,SimpleChanges } from '@angular/core';

import { Product } from '@shared/models/product.model'
import { Category } from '@shared/models/category.model';
import { ProductComponent } from '@products/components/product/product.component'
import { HeaderComponent } from '@shared/components/header/header.component'
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { CartService } from '@shared/services/cart.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export default class ListComponent {
  products = signal<Product[]>([])
  categories = signal<Category[]>([])
  private cartService = inject(CartService)
  private productService = inject(ProductService)
  private categoryService = inject(CategoryService)
  @Input() category_id? : string

  ngOnInit() {
    this.getCategories()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts()
  }
  
  private getProducts() {
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products)
      },
      error: () => {}
    })
  }

  private getCategories() {
    this.categoryService.getAllCategories()
    .subscribe({
      next: (data) => {
        this.categories.set(data)
      },
      error: () => {}
    })
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }
}
