import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-about-story',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './about-story.component.html',
    styleUrl: './about-story.component.scss'
})
export class AboutStoryComponent {
    title = input.required<string>();
    description = input.required<string[]>();
    image = input.required<string>();
    // Rebuild trigger
}
