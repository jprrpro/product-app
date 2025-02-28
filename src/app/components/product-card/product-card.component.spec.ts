import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ProductCardComponent, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = { id: 1, name: 'Test Product', price: 100 } as Product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addToCart event when handleAddToCart is called', () => {
    spyOn(component.addToCart, 'emit');
    component.handleAddToCart(1, new Event('click'));
    expect(component.addToCart.emit).toHaveBeenCalledWith(component.product);
  });

  it('should navigate to product detail when handleProductClick is called', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.navigateToDetail(component.product.id);
    expect(router.navigate).toHaveBeenCalledWith(['/products', component.product.id]);
  });
});
