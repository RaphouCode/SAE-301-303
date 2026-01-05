import { Component, input, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

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
export class TeamGridComponent implements AfterViewInit {
    members = input.required<TeamMember[]>();
    
    @ViewChildren('chefCard') chefCards!: QueryList<ElementRef>;

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
            this.chefCards.forEach(card => {
                if (card.nativeElement) {
                    observer.observe(card.nativeElement);
                }
            });
        }, 100);
    }
}
