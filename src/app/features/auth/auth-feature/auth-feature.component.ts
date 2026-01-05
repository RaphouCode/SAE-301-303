import { Component } from '@angular/core';
import { LoginFormComponent } from '../../../shared/components/login-form/login-form.component';
import { RegisterFormComponent } from '../../../shared/components/register-form/register-form.component';

@Component({
    selector: 'app-auth-feature',
    standalone: true,
    imports: [LoginFormComponent, RegisterFormComponent],
    templateUrl: './auth-feature.component.html',
    styleUrl: './auth-feature.component.scss'
})
export class AuthFeatureComponent {
    // Smart Component - Gestion Auth
}
