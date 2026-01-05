import { Component } from '@angular/core';
import { AboutGridComponent, AboutItem } from '../../../shared/components/about-grid/about-grid.component';

@Component({
    selector: 'app-about-feature',
    standalone: true,
    imports: [AboutGridComponent],
    templateUrl: './about-feature.component.html',
    styleUrl: './about-feature.component.scss'
})
export class AboutFeatureComponent {
    // Données basées sur la maquette infos2.png "Notre savoir-faire"
    savoirFaireItems: AboutItem[] = [
        {
            title: "La Sélection de l'Excellence",
            description: "Le choix du produit est primordial. Nous sélectionnons les plus belles pièces pour vous garantir une fraîcheur et une qualité absolue à chaque bouchée.",
            image: "/assets/images/sushi2.png"
        },
        {
            title: "La Précision du Geste",
            description: "La découpe est un art millimétré. Notre chef travaille chaque filet avec une précision extrême pour en exalter la finesse et la texture.",
            image: "/assets/images/sushi3.png"
        },
        {
            title: "La Touche Finale",
            description: "L'équilibre parfait. Chaque pièce est délicatement laquée au pinceau avec notre sauce maison pour révéler toutes ses saveurs subtiles.",
            image: "/assets/images/sushi4.png"
        },
        {
            title: "L'Art du Sushi",
            description: "Une création artisanale. Nos sushis sont façonnés à la main avec passion, alliant tradition et produits d'exception pour une expérience authentique.",
            image: "/assets/images/sushi1.png"
        }
    ];
}
