import { Component } from '@angular/core';
import { ContactFormComponent, ContactFormData } from '../../../shared/components/contact-form/contact-form.component';

@Component({
    selector: 'app-contact-feature',
    standalone: true,
    imports: [ContactFormComponent],
    templateUrl: './contact-feature.component.html',
    styleUrl: './contact-feature.component.scss'
})
export class ContactFeatureComponent {
    // Placeholder image that closely matches the "Sushi on slate" design
    heroImage = '/assets/images/sushi-5364661_1280.png';

    handleContactSubmit(data: ContactFormData) {
        console.log('Formulaire de contact soumis:', data);
        // Ici, on pourrait appeler un service pour envoyer les données
        alert(`Merci ${data.firstName}, votre message a bien été envoyé ! (Simulation)`);
    }
}
