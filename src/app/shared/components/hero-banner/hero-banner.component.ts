import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-hero-banner',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './hero-banner.component.html',
    styleUrl: './hero-banner.component.scss'
})
export class HeroBannerComponent {
    title = input.required<string>();
    subtitle = input<string>();
    backgroundImage = input.required<string>();
}
