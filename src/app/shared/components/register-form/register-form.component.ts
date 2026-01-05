import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Formulaire avec les clés que le PHP attend
    this.form = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
      adresse: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    // Récupération des données du formulaire
    const userData = this.form.value;

    // Chemin vers le script PHP
    const apiUrl = 'http://localhost/SAE-301-303/bdd/api/users/add_user.php';

    this.http.post(apiUrl, userData).subscribe({
      next: (response: any) => {
        console.log('Succès:', response);
        this.message = 'Inscription réussie ! Vous pouvez vous connecter.';
        this.isError = false;
        this.form.reset();
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.isError = true;
        // Message d'erreur envoyé par le PHP
        // Si y'a pas de message précis
        this.message = err.error?.error || 'Erreur de connexion au serveur.';
      },
    });
  }
}
