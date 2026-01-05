import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cgu-feature',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cgu-feature.component.html',
    styleUrl: './cgu-feature.component.scss'
})
export class CguFeatureComponent implements AfterViewInit {
    // Page CGU (Conditions Générales d'Utilisation)
    
    @ViewChild('title', { static: false }) title!: ElementRef;
    @ViewChild('intro', { static: false }) intro!: ElementRef;
    @ViewChild('section1', { static: false }) section1!: ElementRef;
    @ViewChild('section2', { static: false }) section2!: ElementRef;
    @ViewChild('section3', { static: false }) section3!: ElementRef;
    @ViewChild('section4', { static: false }) section4!: ElementRef;
    @ViewChild('section5', { static: false }) section5!: ElementRef;
    @ViewChild('section6', { static: false }) section6!: ElementRef;
    
    ngAfterViewInit() {
        // Scroll en haut de la page au chargement
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Configurer les animations
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

        // Observer les sections après un court délai
        setTimeout(() => {
            const sections = [
                this.section1,
                this.section2,
                this.section3,
                this.section4,
                this.section5,
                this.section6
            ];
            
            sections.forEach(section => {
                if (section?.nativeElement) {
                    observer.observe(section.nativeElement);
                }
            });
        }, 100);
    }
}
