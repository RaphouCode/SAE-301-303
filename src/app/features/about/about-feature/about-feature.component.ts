import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { AboutGridComponent, AboutItem } from '../../../shared/components/about-grid/about-grid.component';
=======
import { HeroBannerComponent } from '../../../shared/components/hero-banner/hero-banner.component';
import { AboutStoryComponent } from '../../../shared/components/about-story/about-story.component';
import { AboutValuesComponent, ValueItem } from '../../../shared/components/about-values/about-values.component';
import { TeamGridComponent, TeamMember } from '../../../shared/components/team-grid/team-grid.component';
>>>>>>> Stashed changes

@Component({
    selector: 'app-about-feature',
    standalone: true,
<<<<<<< Updated upstream
    imports: [AboutGridComponent],
=======
    imports: [
        HeroBannerComponent,
        AboutStoryComponent,
        AboutValuesComponent,
        TeamGridComponent
    ],
>>>>>>> Stashed changes
    templateUrl: './about-feature.component.html',
    styleUrl: './about-feature.component.scss'
})
export class AboutFeatureComponent {
<<<<<<< Updated upstream
    // Données basées sur la maquette infos2.png "Notre savoir-faire"
    savoirFaireItems: AboutItem[] = [
        {
            title: "La Sélection de l'Excellence",
            description: "Le choix du produit est primordial. Nous sélectionnons les plus belles pièces pour vous garantir une fraîcheur et une qualité absolue à chaque bouchée.",
            image: "assets/images/sushi2.png"
        },
        {
            title: "La Précision du Geste",
            description: "La découpe est un art millimétré. Notre chef travaille chaque filet avec une précision extrême pour en exalter la finesse et la texture.",
            image: "assets/images/sushi3.png"
        },
        {
            title: "La Touche Finale",
            description: "L'équilibre parfait. Chaque pièce est délicatement laquée au pinceau avec notre sauce maison pour révéler toutes ses saveurs subtiles.",
            image: "assets/images/sushi4.png"
        },
        {
            title: "L'Art du Sushi",
            description: "Une création artisanale. Nos sushis sont façonnés à la main avec passion, alliant tradition et produits d'exception pour une expérience authentique.",
            image: "assets/images/sushi1.png"
=======
    // Hero Data
    heroTitle = 'Notre Histoire';
    heroSubtitle = 'Tradition, Passion et Excellence Japonaise';
    heroImage = 'assets/images/about-hero.png'; // Updated image path

    // Story Data
    storyTitle = 'Depuis 2024';
    storyDescription = [
        "Tout a commencé par une passion commune pour l'art culinaire japonais. Situé au cœur de la ville, notre restaurant est né de l'envie de partager des saveurs authentiques dans un cadre moderne et chaleureux.",
        "Nos chefs, experts dans l'art du sushi, sélectionnent chaque matin les poissons les plus frais pour vous garantir une expérience gustative inoubliable. Nous croyons que la qualité des ingrédients est la clé d'un bon sushi."
    ];
    storyImage = 'assets/images/about-hero.png';

    // Values Data
    values: ValueItem[] = [
        {
            icon: 'fa-solid fa-leaf', // Assuming FontAwesome is used, otherwise replace with SVGs
            title: 'Fraîcheur',
            description: 'Des produits frais livrés quotidiennement pour une qualité optimale.'
        },
        {
            icon: 'fa-solid fa-hand-holding-heart',
            title: 'Savoir-faire',
            description: 'Une maîtrise technique transmise par nos maîtres sushis.'
        },
        {
            icon: 'fa-solid fa-globe',
            title: 'Responsabilité',
            description: 'Nous privilégions la pêche durable et les circuits courts.'
        }
    ];

    // Team Data
    teamMembers: TeamMember[] = [
        {
            id: '1',
            name: 'Akira Tanaka',
            role: 'Chef Exécutif',
            image: 'assets/images/about-hero.png',
            bio: '20 ans d\'expérience dans les plus grands restaurants de Tokyo.'
        },
        {
            id: '2',
            name: 'Sophie Martin',
            role: 'Sous-Chef',
            image: 'assets/images/about-hero.png',
            bio: 'Passionnée par la fusion franco-japonaise.'
        },
        {
            id: '3',
            name: 'Kenji Suzuki',
            role: 'Maître Sushi',
            image: 'assets/images/about-hero.png',
            bio: 'La précision du geste avant tout.'
>>>>>>> Stashed changes
        }
    ];
}
