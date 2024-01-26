import { Component, inject, signal, Input,SimpleChanges } from '@angular/core';
import { Product } from '@shared/models/product.model'
import { Category } from '@shared/models/category.model';
import { ProductComponent } from '@products/components/product/product.component'
import { HeaderComponent } from '@shared/components/header/header.component'
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { CartService } from '@shared/services/cart.service';
import { RouterLinkWithHref } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PriceFilterPipe } from '@shared/pipes/price-filter.pipe';
import { CapitalizeFirstLetterPipe } from '@shared/pipes/capitalize-first-letter.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref, FormsModule, PriceFilterPipe, CapitalizeFirstLetterPipe],
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
  priceFilterValue : number = 0

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

  updatePriceRange(value: number) {
    return value.toString()
  }
}
