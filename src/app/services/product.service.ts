import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Products signal
  private products = signal<Product[]>([]);
  
  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  /**
   * Load products
   */
  private loadProducts() {
    this.http.get<Product[]>('/assets/products.json').subscribe(products => this.products.set(products));
  }

  /**
   * Get products
   * 
   * @returns Observable<Product[]>
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/products.json');
  }

  /**
   * Get product by id
   * 
   * @param id number
   * @returns Observable<Product | undefined>
   */
  getProductById(id: number): Observable<Product | undefined> {
    return new Observable(observer => {
      const product = this.products().find(p => p.id === id);
      observer.next(product);
      observer.complete();
    });
  }

}
