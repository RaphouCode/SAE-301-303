import { Component } from '@angular/core';
import { TeamGridComponent, TeamMember } from '../../../shared/components/team-grid/team-grid.component';

@Component({
    selector: 'app-team-feature',
    standalone: true,
    imports: [TeamGridComponent],
    templateUrl: './team-feature.component.html',
    styleUrl: './team-feature.component.scss'
})
export class TeamFeatureComponent {
    // Données des chefs basées sur la maquette infos1.png
    chefs: TeamMember[] = [
        {
            id: '1',
            name: 'Kazuki Mori',
            role: 'Chef Exécutif',
            image: 'assets/images/kazuki-mori.jpg', // Placeholder path
            bio: "Kazuki Mori est un chef de sushi passionné, reconnu pour son savoir-faire et sa créativité. Chaque plat qu'il prépare reflète sa maîtrise des techniques traditionnelles tout en explorant des saveurs modernes. Son restaurant est le reflet de son engagement : offrir une expérience authentique et raffinée à chaque client."
        },
        {
            id: '2',
            name: 'Haruto Tanaka',
            role: 'Chef Sushi',
            image: 'assets/images/haruto-tanaka.jpg',
            bio: "Haruto Tanaka est un chef de sushi reconnu pour sa précision et son sens du détail. Chaque pièce qu'il crée allie tradition et élégance, mettant en valeur des ingrédients de première qualité. Son objectif est simple : offrir à chaque convive un moment unique et raffiné."
        },
        {
            id: '3',
            name: 'Ayumi Sato',
            role: 'Cheffe de Sushi',
            image: 'assets/images/ayumi-sato.jpg',
            bio: "Ayumi Sato est une cheffe de sushi qui se distingue par sa créativité et son audace. Elle revisite les classiques avec des touches contemporaines, tout en respectant l'essence de la cuisine japonaise. Son restaurant est un lieu où chaque bouchée raconte une histoire."
        }
    ];
}
