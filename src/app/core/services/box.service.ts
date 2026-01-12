import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Box } from '../models/box.model';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class BoxService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/boxes/index.php`;
    private readonly imagePath = 'assets/images/imageBox/';

    getAllBoxes(): Observable<Box[]> {
        return this.http.get<Box[]>(this.apiUrl).pipe(
            map(boxes => boxes.map(box => ({
                ...box,
                image: this.imagePath + box.image + '.jpg'
            })))
        );
    }

    getBoxById(id: number): Observable<Box> {
        const url = this.apiUrl.replace('index.php', 'get_box.php') + '?id=' + id;
        return this.http.get<Box>(url).pipe(
            map(box => ({
                ...box,
                image: this.imagePath + box.image + '.jpg'
            }))
        );
    }
}
