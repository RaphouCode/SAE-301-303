import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Box } from '../../../core/models/box.model';

@Component({
    selector: 'app-box-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './box-card.component.html',
    styleUrl: './box-card.component.scss'
})
export class BoxCardComponent {
    box = input.required<Box>();
    addToCart = output<Box>();

    onAdd() {
        this.addToCart.emit(this.box());
    }
}
