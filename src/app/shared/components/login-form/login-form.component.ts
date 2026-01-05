import { Component, Output, EventEmitter } from '@angular/core'; // <--- 1. AJOUT ICI
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

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

  // <--- 2. AJOUT ICI : L'événement pour prévenir le parent
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

  // <--- 3. AJOUT ICI : La fonction appelée quand on clique sur "S'inscrire"
  onRegisterClick(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page
    this.switchToRegister.emit(); // Envoie le signal au parent (AuthFeature)
  }

  submit() {
    if (this.form.invalid) return;

    // Attention : Vérifie bien que ce chemin est correct !
    const apiUrl = 'http://localhost/SAE-301-303/bdd/api/users/login.php';

    this.http.post(apiUrl, this.form.value).subscribe({
      next: (response: any) => {
        console.log('Réponse serveur:', response);

        // 1. On sauvegarde l'utilisateur connecté dans le navigateur
        sessionStorage.setItem('user', JSON.stringify(response.user));

        // 2. Redirection vers la page d'accueil (ou profil)
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erreur:', err);
        // Affiche l'erreur renvoyée par PHP ou un message par défaut
        this.message = err.error?.error || 'Email ou mot de passe incorrect.';
      },
    });
  }
}
