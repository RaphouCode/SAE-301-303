import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '@env/environment';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';

// Dumb Components
import { KpiCardComponent } from '../../../shared/components/kpi-card/kpi-card.component';
import { StatsChartComponent } from '../../../shared/components/stats-chart/stats-chart.component';
import { OrdersTableComponent } from '../../../shared/components/orders-table/orders-table.component';

// Register Chart.js components
Chart.register(...registerables);

interface StatsResponse {
    success: boolean;
    data: {
        total_ca: number;
        nb_commandes: number;
        ventes_par_box: { nom: string; total_vendus: number; ca_box: number }[];
        ca_par_mois: { mois: string; ca_mensuel: number; nb_commandes: number }[];
        clients_par_status: { status: string; nb_clients: number }[];
        commandes_recentes: { id_commande: number; date_commande: string; prix_total: number; status: string; client_name: string }[];
    };
}

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        KpiCardComponent,
        StatsChartComponent,
        OrdersTableComponent
    ],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
    private http = inject(HttpClient);

    // State
    stats = signal<StatsResponse['data'] | null>(null);
    loading = signal(true);
    error = signal<string | null>(null);

    // Computed values for KPI cards
    formattedTotalCA = computed(() => {
        const ca = this.stats()?.total_ca ?? 0;
        const numCa = typeof ca === 'string' ? parseFloat(ca) : ca;
        return numCa.toFixed(2).replace('.', ',') + ' €';
    });

    clientSubValues = computed(() => {
        const clients = this.stats()?.clients_par_status ?? [];
        return clients.map(c => ({
            label: c.status === 'student' ? 'Étudiant' : 'Standard',
            value: c.nb_clients
        }));
    });

    // Computed Chart Data
    salesChartData = computed<ChartData>(() => {
        const ventesByBox = this.stats()?.ventes_par_box ?? [];
        const colors = [
            '#4A154B', '#6B2B6B', '#8B3B8B', '#AB4BAB', '#CB5BCB',
            '#E53935', '#EF5350', '#E57373', '#EF9A9A', '#FFCDD2'
        ];
        return {
            labels: ventesByBox.map(v => v.nom),
            datasets: [{
                data: ventesByBox.map(v => typeof v.total_vendus === 'string' ? parseInt(v.total_vendus) : v.total_vendus),
                backgroundColor: colors.slice(0, ventesByBox.length),
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        };
    });

    salesChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { padding: 20, font: { family: 'Roboto', size: 12 } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw} vendus`
                }
            }
        }
    };

    monthlyChartData = computed<ChartData>(() => {
        const caByMonth = this.stats()?.ca_par_mois ?? [];
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        return {
            labels: caByMonth.map(m => {
                const [year, month] = m.mois.split('-');
                return `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`;
            }),
            datasets: [{
                label: 'Chiffre d\'affaires (€)',
                data: caByMonth.map(m => typeof m.ca_mensuel === 'string' ? parseFloat(m.ca_mensuel) : m.ca_mensuel),
                backgroundColor: '#4A154B',
                borderRadius: 8
            }]
        };
    });

    monthlyChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { callback: (value) => `${value} €` },
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
            },
            x: { grid: { display: false } }
        }
    };

    ngOnInit() {
        this.loadStats();
    }

    private loadStats() {
        const apiUrl = `${environment.apiBaseUrl}/orders/stats.php`;

        this.http.get<StatsResponse>(apiUrl).subscribe({
            next: (response) => {
                if (response.success) {
                    this.stats.set(response.data);
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set(err.message || 'Erreur de connexion au serveur');
                this.loading.set(false);
            }
        });
    }
}
