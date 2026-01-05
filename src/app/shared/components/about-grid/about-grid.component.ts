import { Component, input } from '@angular/core';

export interface AboutItem {
    title: string;
    description: string;
    image: string;
}

@Component({
    selector: 'app-about-grid',
    standalone: true,
    imports: [],
    templateUrl: './about-grid.component.html',
    styleUrl: './about-grid.component.scss'
})
export class AboutGridComponent {
    items = input.required<AboutItem[]>();
}
