import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Box } from '../models/box.model';

@Injectable({
    providedIn: 'root'
})
export class BoxService {
    private http = inject(HttpClient);
    // URL de l'API PHP hébergée sur XAMPP (Port 80 par défaut)
    private apiUrl = 'http://localhost/sushimi/bdd/api/boxes/index.php';
    private readonly imagePath = 'assets/images/imageBox/';

    constructor() { }

    getAllBoxes(): Observable<Box[]> {
        return this.http.get<Box[]>(this.apiUrl).pipe(
            map(boxes => boxes.map(box => ({
                ...box,
                image: this.imagePath + box.image + '.jpg'
            })))
        );
    }

    getBoxById(id: number): Observable<Box> {
        // On remplace index.php par get_box.php et on ajoute l'ID
        const url = this.apiUrl.replace('index.php', 'get_box.php') + '?id=' + id;
        return this.http.get<Box>(url).pipe(
            map(box => ({
                ...box,
                image: this.imagePath + box.image + '.jpg'
            }))
        );
    }
}
