import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  private router = inject(Router);

  scrollToTop() {
    // Scroll en haut de la page avec animation smooth
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateAndScrollToTop(route: string) {
    // Navigation puis scroll en haut
    this.router.navigate([route]).then(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    });
  }
}
