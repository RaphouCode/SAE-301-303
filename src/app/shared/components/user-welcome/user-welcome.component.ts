import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-welcome',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-welcome.component.html',
    styleUrls: ['./user-welcome.component.scss']
})
export class UserWelcomeComponent {
    @Input({ required: true }) userName!: string;
    @Input() userEmail?: string;
    @Output() logout = new EventEmitter<void>();

    onLogout() {
        this.logout.emit();
    }
}
