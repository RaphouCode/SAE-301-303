import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

export interface OrderItem {
    id_box: number;
    quantite: number;
}

export interface CreateOrderRequest {
    id_client: number;
    box: OrderItem[];
    adresse: string;
    canal: string;
}

export interface CreateOrderResponse {
    success: boolean;
    order_id: number;
    total_price: number;
    error?: string;
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/orders`;

    createOrder(order: CreateOrderRequest): Observable<CreateOrderResponse> {
        return this.http.post<CreateOrderResponse>(`${this.apiUrl}/create.php`, order);
    }
}
