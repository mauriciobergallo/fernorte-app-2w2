import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class RequestResponseService {

    constructor(private http: HttpClient) { }

    makeGetRequest<T>(url: string, options?: any): Observable<any> {
        options = this.getOptions(options);
        return this.http.get<T>(url, options);
    }

    makePostRequest<T>(url: string, body: any, options?: any): Observable<any> {
        options = this.getOptions(options);
        return this.http.post<T>(url, body, options);
    }
    makePutRequest<T>(url: string, body:any, options?: any): Observable<any>{
        options = this.getOptions(options);
        return this.http.put<T>(url, body, options);
    }

    makeDeleteRequest<T>(url: string, options?: any): Observable<any>{
        options = this.getOptions(options);
        return this.http.delete<T>(url, options);
    }


    private getOptions(options: any): any {
        //aca se puede agregar el token y sacar los distintos datos del usuario logueado
        return options;
    }
}