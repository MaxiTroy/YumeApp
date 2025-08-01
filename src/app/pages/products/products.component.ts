import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  ngOnInit() {
    // Simular carga de productos con timeout de 5 segundos
    setTimeout(() => {
      this.loadProducts();
    }, 5000);
  }

  loadProducts() {
    // Datos de ejemplo - en producción esto vendría de un API
    this.products = [
      {
        id: 1,
        name: 'Tarjetas de Presentación',
        description: 'Tarjetas personalizadas con tu información de contacto',
        price: 15000,
        category: 'Tarjetas',
      },
      {
        id: 2,
        name: 'Folletos A4',
        description: 'Folletos informativos en tamaño A4, impresión a color',
        price: 25000,
        category: 'Folletos',
      },
      {
        id: 3,
        name: 'Banners Publicitarios',
        description: 'Banners de gran formato para eventos y publicidad',
        price: 45000,
        category: 'Banners',
      },
      {
        id: 4,
        name: 'Stickers Personalizados',
        description: 'Stickers adhesivos con tu diseño personalizado',
        price: 8000,
        category: 'Stickers',
      },
      {
        id: 5,
        name: 'Volantes A5',
        description: 'Volantes en tamaño A5, ideal para promociones',
        price: 12000,
        category: 'Volantes',
      },
      {
        id: 6,
        name: 'Posters A3',
        description: 'Posters en tamaño A3, perfectos para decoración',
        price: 18000,
        category: 'Posters',
      },
    ];

    this.filteredProducts = [...this.products];
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onProductClick(product: Product) {
    console.log('Producto clickeado:', product.name);
    // TODO: Implementar navegación a detalles del producto
  }
}
