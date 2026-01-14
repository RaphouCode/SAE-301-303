import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnChanges, SimpleChanges, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, ChartType, ChartData, ChartOptions } from 'chart.js';

@Component({
    selector: 'app-stats-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stats-chart.component.html',
    styleUrls: ['./stats-chart.component.scss']
})
export class StatsChartComponent implements AfterViewInit, OnChanges {
    private platformId = inject(PLATFORM_ID);

    @ViewChild('chartCanvas') chartCanvasRef!: ElementRef<HTMLCanvasElement>;

    @Input({ required: true }) title!: string;
    @Input({ required: true }) type!: ChartType;
    @Input({ required: true }) data!: ChartData;
    @Input() options?: ChartOptions;

    private chart: Chart | null = null;

    ngAfterViewInit() {
        this.createChart();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ((changes['data'] || changes['type']) && this.chartCanvasRef) {
            this.createChart();
        }
    }

    private createChart() {
        if (!isPlatformBrowser(this.platformId)) return;
        if (!this.chartCanvasRef?.nativeElement) return;
        if (!this.data?.datasets?.length) return;

        const ctx = this.chartCanvasRef.nativeElement.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
            type: this.type,
            data: this.data,
            options: this.options || {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}
