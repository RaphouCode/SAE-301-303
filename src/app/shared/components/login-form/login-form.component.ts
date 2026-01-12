import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '@env/environment';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
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

        this.http.post(apiUrl, this.form.value).subscribe({
            next: (response: any) => {
                sessionStorage.setItem('user', JSON.stringify(response.user));
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.message = err.error?.error || 'Email ou mot de passe incorrect.';
            },
        });
    }
}
