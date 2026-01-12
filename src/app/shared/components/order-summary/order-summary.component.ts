import { Component, input } from '@angular/core';

@Component({
    selector: 'app-order-summary',
    standalone: true,
    imports: [],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
    subtotal = input.required<number>();
    deliveryFee = input<number>(0);
}
