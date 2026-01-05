import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxCardComponent } from '../box-card/box-card.component';
import { Box } from '../../../core/models/box.model';

@Component({
    selector: 'app-box-grid',
    standalone: true,
    imports: [CommonModule, BoxCardComponent],
    templateUrl: './box-grid.component.html',
    styleUrl: './box-grid.component.scss'
})
export class BoxGridComponent {
    boxes = input.required<Box[]>();
    boxClicked = output<Box>(); // Pour remonter le clic au smart component

    onBoxClick(box: Box) {
        this.boxClicked.emit(box);
    }
}
