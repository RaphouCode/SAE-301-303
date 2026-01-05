import { Component, input } from '@angular/core';

export interface ValueItem {
    icon: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-about-values',
    standalone: true,
    imports: [],
    templateUrl: './about-values.component.html',
    styleUrl: './about-values.component.scss'
})
export class AboutValuesComponent {
    values = input.required<ValueItem[]>();
    // Rebuild trigger
}
