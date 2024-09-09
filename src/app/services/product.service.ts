import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string= "http://localhost:8085/api/v1/admin/products"
  
  constructor(
    private http: HttpClient
  ) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(formData: any):Observable<Product>{
    return this.http.post<Product> (this.apiUrl, formData)
  }

  getProductById(id: number):Observable<Product>{
    return this.http.get<Product> (`${this.apiUrl}/${id}`);
  }

  deleteProductById(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
