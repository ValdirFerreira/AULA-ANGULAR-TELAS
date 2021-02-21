import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Produto } from "../models/Produto";
import { InputModel, token } from "../models/InputModel";
@Injectable({ providedIn: 'root' })

export class Service {
    private readonly urlBackEnd = environment["apiBackEnd"];
    private readonly urlToken = environment["apiToken"];
    tokenUsuario: any;
    constructor(private httpClient: HttpClient) {
    }

    public GerarToken() {
        var url = this.urlToken;
        var usuario =
        {
            Email: "valdir@valdir.com",
            Password: "@Valdir222"
        }
        return this.tokenUsuario = this.httpClient.post<string>(url, usuario,

            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers':
                        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
                })
            });
    }

    public ListaProdutos(tokenUsuario: any) {
        var url = this.urlBackEnd + "ListaProdutos"
        return this.httpClient.get<Object>(url,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${tokenUsuario}`
                })
            })

    }

    public InsereProduto(produto: any, tokenUsuario: any) {
        var url = this.urlBackEnd + "AdicionarProduto"
        return this.httpClient.post<Produto>(url, produto,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${tokenUsuario}`
                })
            })
    }

}