import { CommonModule } from '@angular/common';
import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product: WritableSignal<Product | undefined> = signal<Product | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService
      .getProductById(id)
      .subscribe((product) => this.product.set(product));
  }
}
