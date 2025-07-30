import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  cards = [
    {
      title: 'Presupuestos',
      description:
        'Aca podes sacar un presupuesto, tan solo necesitas la cantidad de paginas que tiene tu archivo y el tipo de impresion que necesitas ✨',
      icon: 'calculate',
    },
    {
      title: 'Productos',
      description:
        'Podes ver todos nuestros productos! Ademas podes ver nuestros productos personalizados que hacemos a pedido 💪🏽',
      icon: 'assignment',
    },
    {
      title: 'Nuevo producto',
      description: 'Tenemos un nuevo producto? No te olvides de cargarlo.! 🙌🏽',
      icon: 'assignment_add',
    },
  ];

  importantInfo = {
    title: '¡Información Importante!',
    description:
      'Horarios de atención: Lunes a Viernes de 9:00 a 18:00. \n Envíos gratuitos en compras superiores a $25.000. \n Tamaños de Referencia \n A4 -> 21 x 29,7 cm (tamaño estandar) \n A3 -> 29,7 x 42 cm (doble A4) \n A5 -> 14,8 x 21 cm (mitad A4) \n A6 -> 10,5 x 14,8 cm (mitad A5)',
    icon: 'info',
    highlight: true,
  };

  onCardClick(card: any) {
    console.log('Card clicked:', card.title);
  }
}
