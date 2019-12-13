import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>("api/produtos/getAll");
  }

  getProdutosById(id: number): Observable<Produto> {
    return this.http.get<Produto>("api/produtos/" + id);
  }

  createProduto(produto: Produto) {
    return this.http.post("api/produtos/Post", produto);
  }

  updateProduto(produto: Produto) {
    return this.http.post("api/produtos/Put/" + produto.id, produto);
  }

  deleteProduto(id: number) {
    return this.http.delete("api/produtos/Delete/" + id);
  }
}
