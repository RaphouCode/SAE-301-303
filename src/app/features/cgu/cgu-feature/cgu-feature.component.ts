import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
    selector: 'app-cgu-feature',
    standalone: true,
    imports: [CommonModule, HeaderComponent, FooterComponent],
    templateUrl: './cgu-feature.component.html',
    styleUrl: './cgu-feature.component.scss'
})
export class CguFeatureComponent {
    // Page CGU (Conditions Générales d'Utilisation)
}
