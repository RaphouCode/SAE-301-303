import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [],
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.scss'
})
export class CtaSectionComponent {
  imageSrc = input<string>('/assets/images/sushi_plate.svg');
  imageAlt = input<string>('Chef préparant des sushis');
  title = input<string>('Première commande ? Profitez d\'une réduction spéciale!');
  subtitle = input<string>('Rien que du frais, rien que du bon');
}
