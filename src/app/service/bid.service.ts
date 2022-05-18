import { Injectable } from '@angular/core';
import {  ConfigService} from './share/config.service'
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {ProductBidDetail} from '../entity/product-bid-detail'

@Injectable({
  providedIn: 'root'
})
export class BidService {
  getAllProductBidUrl:string;
  constructor(private httpClient : HttpClient ,private configService : ConfigService) {
    this.getAllProductBidUrl='/e-auction/api/v1/seller/show-bids';
   }

   getAllProductBid(productId:string): Observable<ProductBidDetail[]>{
    let params = new HttpParams();
    params = params.append('productId', productId);
    const url =this.configService.getServerUrl(this.getAllProductBidUrl);
    return this.httpClient.get<ProductBidDetail[]>(`${url}/${productId}`)
    .pipe(
       catchError(this.handleError<ProductBidDetail[]>('', 
      []))
    );
  }
  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
  private log(message: string) {
    console.log(message);
  }
}
