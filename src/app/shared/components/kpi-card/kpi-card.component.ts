import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-kpi-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './kpi-card.component.html',
    styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
    @Input({ required: true }) icon!: string;
    @Input({ required: true }) label!: string;
    @Input() value?: string | number;
    @Input() subValues?: { label: string; value: string | number }[];
}
