import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  ApiService,
  HomeCard,
  ImportantInfo,
} from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  cards: HomeCard[] = [];
  importantInfo: ImportantInfo | null = null;
  loading = true;
  error = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.loadHomeData();
  }

  loadHomeData() {
    this.loading = true;
    this.error = false;

    // Cargar cards del home
    this.apiService.getServices().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando cards:', error);
        this.error = true;
        this.loading = false;
      },
    });

    // Cargar información importante
    this.apiService.getImportantInfo().subscribe({
      next: (info) => {
        this.importantInfo = info[0] || null; // Tomar el primer elemento
      },
      error: (error) => {
        console.error('Error cargando información importante:', error);
      },
    });
  }

  onCardClick(card: HomeCard | ImportantInfo) {
    if ('path' in card && card.path) {
      this.router.navigate([card.path]);
    }
  }

  retryLoad() {
    this.loadHomeData();
  }
}
