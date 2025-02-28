import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  // Products signal
  products: WritableSignal<Product[]> = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Load products
    this.productService.getProducts().subscribe(products => this.products.set(products));
  }

  /**
   * Adds product to cart
   * 
   * @param product Product
   */
  handleAddToCart(product: Product) {
    alert(`Product added to cart: ${product.name}`);
  }
}
