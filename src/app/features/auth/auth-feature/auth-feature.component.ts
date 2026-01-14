import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../../shared/components/login-form/login-form.component';
import { RegisterFormComponent } from '../../../shared/components/register-form/register-form.component';
import { UserWelcomeComponent } from '../../../shared/components/user-welcome/user-welcome.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-feature',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, RegisterFormComponent, UserWelcomeComponent],
  templateUrl: './auth-feature.component.html',
  styleUrl: './auth-feature.component.scss',
})
export class AuthFeatureComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  isLoginMode: boolean = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userFullName(): string {
    const user = this.authService.currentUser;
    return user ? `${user.prenom} ${user.nom}` : '';
  }

  get userEmail(): string {
    return this.authService.currentUser?.email ?? '';
  }

  toggleView() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
