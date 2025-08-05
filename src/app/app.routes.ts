import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'new-product',
    loadComponent: () =>
      import('./pages/new-product/new-product.component').then(
        (m) => m.NewProductComponent
      ),
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./pages/calculator/calculator.component').then(
        (m) => m.CalculatorComponent
      ),
  },
];
