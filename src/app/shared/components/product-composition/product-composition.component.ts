import { Component, input } from '@angular/core';

export interface CompositionItem {
    quantity: number;
    name: string;
}

@Component({
    selector: 'app-product-composition',
    standalone: true,
    imports: [],
    templateUrl: './product-composition.component.html',
    styleUrl: './product-composition.component.scss'
})
export class ProductCompositionComponent {
    composition = input.required<CompositionItem[]>();
}
