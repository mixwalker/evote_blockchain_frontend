import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockchainApiService {

  constructor(private http: HttpClient) { }

  getAllChain() {
    return this.http.get<any>(`chain_api/get_chain`);
  }

  getByElectionId() {
    return this.http.get<any>(`chain_api/getby_elecId`);
  }

  mining(data:any) {
    return this.http.post<any>(`chain_api/mining`,data);
  }
}
