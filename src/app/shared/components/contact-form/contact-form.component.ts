import { Component, output } from '@angular/core';

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
    // Smart Component - Formulaire contact avec validation
    // Utilise ReactiveForms d'Angular (typé strictement)
    // Champs : Prénom, Nom, Mail, Téléphone, Objet, Message

    submitForm = output<ContactFormData>();
}
