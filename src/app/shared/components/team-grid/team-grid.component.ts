import { Component, input } from '@angular/core';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    bio?: string;
}

@Component({
    selector: 'app-team-grid',
    standalone: true,
    imports: [],
    templateUrl: './team-grid.component.html',
    styleUrl: './team-grid.component.scss'
})
export class TeamGridComponent {
    // Dumb Component - Grille équipe
    // Similaire à ProductGrid mais pour les profils des chefs
    // (Kazaki Mori, etc.)
    members = input.required<TeamMember[]>();
}
