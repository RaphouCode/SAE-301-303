import { Component, input, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

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
export class AboutGridComponent implements AfterViewInit {
    items = input.required<AboutItem[]>();
    
    @ViewChildren('aboutItem') aboutItems!: QueryList<ElementRef>;

    ngAfterViewInit() {
        this.setupScrollAnimations();
    }

    private setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observer les éléments après un court délai pour s'assurer qu'ils sont dans le DOM
        setTimeout(() => {
            this.aboutItems.forEach(item => {
                if (item.nativeElement) {
                    observer.observe(item.nativeElement);
                }
            });
        }, 100);
    }
}
