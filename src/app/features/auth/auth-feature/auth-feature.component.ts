import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- 1. INDISPENSABLE pour le *ngIf
import { LoginFormComponent } from '../../../shared/components/login-form/login-form.component';
import { RegisterFormComponent } from '../../../shared/components/register-form/register-form.component';

@Component({
  selector: 'app-auth-feature',
  standalone: true,
  // 2. Ajoute CommonModule ici 👇
  imports: [CommonModule, LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth-feature.component.html',
  styleUrl: './auth-feature.component.scss',
})
export class AuthFeatureComponent {
  // 3. Variable d'état : par défaut on affiche le Login (true)
  isLoginMode: boolean = true;

  // 4. Fonction qui inverse la valeur (true -> false OU false -> true)
  toggleView() {
    this.isLoginMode = !this.isLoginMode;
  }
}
