import { Component } from '@angular/core';

@Component({
    selector: 'app-product-detail-feature',
    standalone: true,
    imports: [],
    templateUrl: './product-detail-feature.component.html',
    styleUrl: './product-detail-feature.component.scss'
})
export class ProductDetailFeatureComponent {
    // Smart Component - Page Détail Produit
    // Récupère l'ID depuis l'URL (withComponentInputBinding)
    // Trouve le produit dans le store ou refait un fetch API
    // Composants enfants : ProductGallery, ProductComposition, QuantitySelector, RelatedProducts
}
