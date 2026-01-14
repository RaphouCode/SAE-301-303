import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    private authService = inject(AuthService);

    form: FormGroup;
    message: string = '';

    @Output() switchToRegister = new EventEmitter<void>();

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            mot_de_passe: ['', Validators.required],
        });
    }

    onRegisterClick(event: Event) {
        event.preventDefault();
        this.switchToRegister.emit();
    }

    submit() {
        if (this.form.invalid) return;

        const apiUrl = `${environment.apiBaseUrl}/users/login.php`;

        this.http.post<any>(apiUrl, this.form.value).subscribe({
            next: (response) => {
                this.authService.login(response.user, response.api_token);
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.message = err.error?.error || 'Email ou mot de passe incorrect.';
            },
        });
    }
}

