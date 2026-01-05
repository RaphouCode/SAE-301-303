import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chef-image-section',
  standalone: true,
  imports: [],
  templateUrl: './chef-image-section.component.html',
  styleUrl: './chef-image-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChefImageSectionComponent {
  // Dumb Component - Section image horizontale du chef
  imageSrc = input<string>('/assets/images/chef_preparing_sushi.jpg');
  imageAlt = input<string>('Chef préparant des sushis');
}


