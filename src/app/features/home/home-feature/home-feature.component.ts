import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroSectionComponent } from '../../../shared/components/hero-section/hero-section.component';
import { ChefImageSectionComponent } from '../../../shared/components/chef-image-section/chef-image-section.component';
import { ContentSectionComponent } from '../../../shared/components/content-section/content-section.component';
import { CtaSectionComponent } from '../../../shared/components/cta-section/cta-section.component';

@Component({
  selector: 'app-home-feature',
  standalone: true,
  imports: [
    HeroSectionComponent,
    ChefImageSectionComponent,
    ContentSectionComponent,
    CtaSectionComponent
  ],
  templateUrl: './home-feature.component.html',
  styleUrl: './home-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFeatureComponent {
  welcomeText = `Bienvenue dans un univers où la tradition rencontre la créativité, où chaque bouchée raconte une histoire. Chez Sushimi, nous vous invitons à découvrir une expérience culinaire unique, où les ingrédients les plus frais rencontrent des techniques maîtrisées, où le respect des saveurs et des formes vous transporte dans un espace inspiré du Japon.`;

  authenticityText = `Notre chef, véritable artisan du sushi, a été formé aux méthodes traditionnelles japonaises et s'inspire de nombreuses années d'exploration culinaire. Il combine des techniques ancestrales avec une touche moderne pour créer des saveurs authentiques et inoubliables.`;
}
