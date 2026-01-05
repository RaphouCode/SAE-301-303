import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BoxService } from '../../../core/services/box.service';
import { Box } from '../../../core/models/box.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-product-detail-feature',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './product-detail-feature.component.html',
    styleUrl: './product-detail-feature.component.scss'
})
export class ProductDetailFeatureComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private boxService = inject(BoxService);
    private cartService = inject(CartService);

    box = signal<Box | null>(null);
    loading = signal<boolean>(true);
    error = signal<string | null>(null);

    quantity = signal<number>(1);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadBox(+id);
        } else {
            this.error.set("ID produit manquant");
            this.loading.set(false);
        }
    }

    loadBox(id: number) {
        this.boxService.getBoxById(id).subscribe({
            next: (data) => {
                this.box.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                console.error(err);
                this.error.set("Impossible de charger la box. Vérifiez que get_box.php est bien installé.");
                this.loading.set(false);
                // Mock fallback pour le design si l'API plante
                // this.box.set(this.getMockBox(id)); 
            }
        });
    }

    increment() {
        this.quantity.update(q => q + 1);
    }

    decrement() {
        this.quantity.update(q => (q > 1 ? q - 1 : 1));
    }

    addToCart() {
        if (this.box()) {
            this.cartService.addToCart(this.box()!, this.quantity());
            console.log(`Ajouté au panier: ${this.quantity()} x ${this.box()?.nom}`);
        }
    }

    /*private getMockBox(id: number): Box {
      return {
        id_box: id,
        nom: 'Tasty Blend',
        pieces: 12,
        prix: 12.50,
        image: 'assets/images/sushi1.png',
        saveur: 'Saumon, Thon, Avocat',
        foods: [
          { name: 'Riz vinaigré', quantity: 1 },
          { name: 'Saumon frais', quantity: 1 },
          { name: 'Avocat', quantity: 1 }
        ],
        flavors: ['Douceur', 'Fraîcheur']
      };
    }*/
}
