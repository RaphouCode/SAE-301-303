import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OrderRow {
    id_commande: number;
    date_commande: string;
    prix_total: number;
    status: string;
    client_name: string;
}

@Component({
    selector: 'app-orders-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent {
    @Input({ required: true }) orders!: OrderRow[];
    @Input() title: string = 'Commandes';

    formatPrice(price: number | string): string {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return numPrice.toFixed(2).replace('.', ',') + ' €';
    }

    formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
