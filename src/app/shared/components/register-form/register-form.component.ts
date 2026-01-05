import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core'; // <--- 1. Import Output/Event
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

    // <--- 2. Création de l'événement vers le parent
    @Output() switchToLogin = new EventEmitter<void>();

    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
        // Formulaire avec les clés que le PHP attend
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

    // <--- 3. Fonction déclenchée au clic sur "Se connecter"
    onLoginClick(event: Event) {
        event.preventDefault(); // Empêche le lien de recharger la page
        this.switchToLogin.emit(); // Dit au parent : "Affiche le login !"
    }

    submit() {
        if (this.form.invalid) {
            // Marquer tous les champs comme touchés pour afficher les erreurs
            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key)?.markAsTouched();
            });
            return;
        }

        // Vérifier que les mots de passe correspondent
        if (this.form.get('mot_de_passe')?.value !== this.form.get('confirm_password')?.value) {
            this.form.get('confirm_password')?.setErrors({ passwordMismatch: true });
            return;
        }

        // Récupération des données du formulaire (sans confirm_password)
        const { confirm_password, ...userData } = this.form.value;

        // Chemin vers le script PHP
        // Chemin vers le script PHP (XAMPP sushimi)
        const apiUrl = 'http://localhost/sushimi/bdd/api/users/add_user.php';

        this.http.post(apiUrl, userData).subscribe({
            next: (response: any) => {
                console.log('Succès:', response);
                this.message =
                    'Inscription réussie ! Vous pouvez maintenant vous connecter.';
                this.isError = false;
                this.form.reset();

                // Optionnel : Tu pourrais aussi rediriger automatiquement vers le login après 2 secondes
                // setTimeout(() => this.switchToLogin.emit(), 2000);
            },
            error: (err) => {
                console.error('Erreur:', err);
                this.isError = true;
                this.message = err.error?.error || "Erreur lors de l'inscription.";
            },
        });
    }
}
