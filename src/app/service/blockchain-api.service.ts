import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockchainApiService {

  constructor(private http: HttpClient) { }

  getChain(elecId:any) {
    return this.http.post<any>(`chain_api/get_chain`,elecId);
  }

  getChainSort(elecId:any) {
    return this.http.post<any>(`chain_api/get_chain_sort`,elecId);
  }

  mining(data:any) {
    return this.http.post<any>(`chain_api/mining`,data);
  }
}
