import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Pipe({
  name: 'priceFilter',
  standalone: true
})
export class PriceFilterPipe implements PipeTransform {

  transform(value: Product[], args: number): Product[] {
    // Value equals to Product list
    return value.filter(item => item.price >= args)
  }

}
