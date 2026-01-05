import { Component, Output, EventEmitter } from '@angular/core'; // <--- 1. Import Output/Event
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  form: FormGroup;
  message: string = '';
  isError: boolean = false;

  // <--- 2. Création de l'événement vers le parent
  @Output() switchToLogin = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
      adresse: ['', Validators.required],
    });
  }

  // <--- 3. Fonction déclenchée au clic sur "Se connecter"
  onLoginClick(event: Event) {
    event.preventDefault(); // Empêche le lien de recharger la page
    this.switchToLogin.emit(); // Dit au parent : "Affiche le login !"
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const userData = this.form.value;
    // Vérifie bien que ce chemin est le bon sur ton PC
    const apiUrl = 'http://localhost/SAE-301-303/bdd/api/users/add_user.php';

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
