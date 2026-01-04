import { Component, input } from '@angular/core';

export interface Category {
    id: string;
    name: string;
    image: string;
}

@Component({
    selector: 'app-category-showcase',
    standalone: true,
    imports: [],
    templateUrl: './category-showcase.component.html',
    styleUrl: './category-showcase.component.scss'
})
export class CategoryShowcaseComponent {
    // Dumb Component - Grille catégories principales
    // @Input : tableau CategoryJSON transformé
    categories = input.required<Category[]>();
}
