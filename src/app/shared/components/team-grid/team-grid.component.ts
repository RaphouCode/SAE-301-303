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
    members = input.required<TeamMember[]>();
}
