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
    // Dumb Component - Liste des ingrédients
    // Ex: "3 California Saumon Avocat"
    composition = input.required<CompositionItem[]>();
}
