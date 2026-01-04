import { Component } from '@angular/core';

@Component({
    selector: 'app-product-list-feature',
    standalone: true,
    imports: [],
    templateUrl: './product-list-feature.component.html',
    styleUrl: './product-list-feature.component.scss'
})
export class ProductListFeatureComponent {
    // Smart Component - Page Menu / Nos Boxes
    // Appelle ProductService.getAll()
    // Gère isLoading signal et erreurs
    // Applique les filtres côté client
    // Composants enfants : ProductGrid, ProductCard
}
