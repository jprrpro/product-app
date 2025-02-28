import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private router: Router) {}

  // add product to cart
  handleAddToCart(id: number, event: Event) {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  // navigate to product details
  navigateToDetail(id: number) {
    this.router.navigate(['/products', id]);
  }
}
