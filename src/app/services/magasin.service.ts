import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Magasin} from '../models/magasin';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  private magasinAPIUrl = 'http://localhost:8092/pizza-hut/api/magasins';

  constructor(private http: HttpClient) { }

  public getMagasins() {
    return this.http.get<Magasin[]>(this.magasinAPIUrl);
  }

  public addMagasin(magasin: Magasin) {
    return this.http.post<Magasin>(this.magasinAPIUrl + '/ajouter', magasin);
  }

  public editMagasin(magasin: Magasin) {
    return this.http.put<Magasin>(this.magasinAPIUrl + '/modifier', magasin);
  }

  public deleteMagasin(magasinId: number) {
    return this.http.delete(this.magasinAPIUrl + '/' + magasinId);
  }
}
