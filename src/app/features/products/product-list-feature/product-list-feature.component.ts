import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BoxGridComponent } from '../../../shared/components/box-grid/box-grid.component';
import { BoxService } from '../../../core/services/box.service';
import { Box } from '../../../core/models/box.model';

@Component({
    selector: 'app-product-list-feature',
    standalone: true,
    imports: [CommonModule, BoxGridComponent],
    templateUrl: './product-list-feature.component.html',
    styleUrl: './product-list-feature.component.scss'
})
export class ProductListFeatureComponent implements OnInit {
    boxService = inject(BoxService);
    boxes = signal<Box[]>([]);

    private router = inject(Router);

    ngOnInit() {
        this.boxService.getAllBoxes().subscribe({
            next: (data) => {
                this.boxes.set(data);
                console.log('Boxes chargées:', data);
            },
            error: (err) => {
                console.error('Erreur chargement boxes:', err);
                // this.boxes.set(this.getMockBoxes()); // Désactivé pour voir les vraies données (ou l'erreur)
            }
        });
    }

    onBoxClicked(box: Box) {
        this.router.navigate(['/boxes', box.id_box]);
    }

    private getMockBoxes(): Box[] {
        return Array(8).fill(null).map((_, i) => ({
            id_box: i + 1,
            nom: `Box Sushi Test ${i + 1}`,
            pieces: 12 + i,
            prix: 12.50 + i,
            image: '',
            saveur: 'Saumon'
        }));
    }
}
