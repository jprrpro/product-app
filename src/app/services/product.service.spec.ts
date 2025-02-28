import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', price: 100, description: "" },  
      { id: 2, name: 'Product 2', price: 200, description: "" }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('/assets/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get product by id', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', price: 100, description: "" },
      { id: 2, name: 'Product 2', price: 200, description: "" }
    ];

    service['products'].set(mockProducts);

    service.getProductById(1).subscribe(product => {
      expect(product).toEqual(mockProducts[0]);
    });

    service.getProductById(3).subscribe(product => {
      expect(product).toBeUndefined();
    });
  });
});
