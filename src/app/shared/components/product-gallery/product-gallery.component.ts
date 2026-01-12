import { Component, input } from '@angular/core';

export interface ProductImage {
    url: string;
    alt: string;
}

@Component({
    selector: 'app-product-gallery',
    standalone: true,
    imports: [],
    templateUrl: './product-gallery.component.html',
    styleUrl: './product-gallery.component.scss'
})
export class ProductGalleryComponent {
    images = input.required<ProductImage[]>();
}
