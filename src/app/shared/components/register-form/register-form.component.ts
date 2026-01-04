import { Component, output } from '@angular/core';

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

@Component({
    selector: 'app-register-form',
    standalone: true,
    imports: [],
    templateUrl: './register-form.component.html',
    styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
    // Dumb Component - Formulaire inscription
    // Nom, Prénom, Email, Mot de passe, Confirmation

    submitRegister = output<RegisterData>();
}
