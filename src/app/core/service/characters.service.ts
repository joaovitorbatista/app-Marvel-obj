import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Characters } from '../models/characters.interface';
import { Md5 } from 'ts-md5';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CharactersService {

    private timeStamp = new Date().getTime();
    private apiPrivateKey = '81926776e537ce510db30a443e4f3b328ef1a4aa';
    private hash: string = '';

    constructor(private http: HttpClient) {
        if (this.timeStamp && this.apiPrivateKey && environment.apiPublicKey) {
            this.hash = this.hashCode(this.timeStamp, this.apiPrivateKey, environment.apiPublicKey)
        }
    }

    httpOption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    public getCharacters(num: number): Observable<Characters> {
        if (num) {
            return this.http.get<Characters>(environment.apiUrl + '/characters?limit=10&orderBy=name&offset=' + num + this.hash)
        }
        return this.http.get<Characters>(environment.apiUrl + '/characters?limit=10&orderBy=name' + this.hash)
    }

    public getCharactersById(id: string): Observable<Characters> {
        if (id) {
            return this.http.get<Characters>(environment.apiUrl + '/characters/' + id + '?orderBy=name' + this.hash)
        }
        return this.http.get<Characters>(environment.apiUrl + '/characters?limit=10&orderBy=name' + this.hash)
    }

    public getCharactersByName(name: string): Observable<Characters> {
        if (name) {
            return this.http.get<Characters>(environment.apiUrl + '/characters?limit=10&name=' + name + this.hash)
        }
        return this.http.get<Characters>(environment.apiUrl + '/characters?limit=10&orderBy=name' + this.hash)
    }

    hashCode(timeStamp: number, apiPrivateKey: string, apiPublicKey: string): string {
        let hash = '&ts=' + this.timeStamp + '&apikey=' + environment.apiPublicKey + '&hash=' + Md5.hashAsciiStr(timeStamp + apiPrivateKey + apiPublicKey);
        return hash;
    }


}
