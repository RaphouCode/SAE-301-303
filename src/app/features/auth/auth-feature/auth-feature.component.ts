import { Component } from '@angular/core';

@Component({
    selector: 'app-auth-feature',
    standalone: true,
    imports: [],
    templateUrl: './auth-feature.component.html',
    styleUrl: './auth-feature.component.scss'
})
export class AuthFeatureComponent {
    // Smart Component - Authentification
    // Gère les routes /login et /register
    // Composants enfants : LoginForm, RegisterForm
}
