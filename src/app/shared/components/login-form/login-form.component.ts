import { Component, output } from '@angular/core';

export interface LoginData {
    email: string;
    password: string;
}

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
    // Dumb Component - Formulaire connexion
    // Email / Mot de passe

    submitLogin = output<LoginData>();
}
