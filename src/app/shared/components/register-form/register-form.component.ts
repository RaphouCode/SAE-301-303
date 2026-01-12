import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '@env/environment';

@Component({
    selector: 'app-register-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements AfterViewInit {
    form: FormGroup;
    message: string = '';
    isError: boolean = false;
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;

    @ViewChild('registerContainer', { static: false }) registerContainer!: ElementRef;
    @Output() switchToLogin = new EventEmitter<void>();

    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
        this.form = this.fb.group({
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
            confirm_password: ['', Validators.required],
            adresse: ['', Validators.required],
        }, { validators: this.passwordMatchValidator });
    }

    ngAfterViewInit() {
        this.setupAnimations();
    }

    private setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        setTimeout(() => {
            if (this.registerContainer?.nativeElement) {
                observer.observe(this.registerContainer.nativeElement);
            }
        }, 100);
    }

    passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
        const password = form.get('mot_de_passe')?.value;
        const confirmPassword = form.get('confirm_password')?.value;
        if (password && confirmPassword && password !== confirmPassword) {
            form.get('confirm_password')?.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            form.get('confirm_password')?.setErrors(null);
            return null;
        }
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    navigateToCGU() {
        this.router.navigate(['/cgu']).then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    onLoginClick(event: Event) {
        event.preventDefault();
        this.switchToLogin.emit();
    }

    submit() {
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key)?.markAsTouched();
            });
            return;
        }

        if (this.form.get('mot_de_passe')?.value !== this.form.get('confirm_password')?.value) {
            this.form.get('confirm_password')?.setErrors({ passwordMismatch: true });
            return;
        }

        const { confirm_password, ...userData } = this.form.value;
        const apiUrl = `${environment.apiBaseUrl}/users/add_user.php`;

        this.http.post(apiUrl, userData).subscribe({
            next: () => {
                this.message = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
                this.isError = false;
                this.form.reset();
            },
            error: (err) => {
                this.isError = true;
                this.message = err.error?.error || "Erreur lors de l'inscription.";
            },
        });
    }
}
