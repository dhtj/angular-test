import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Address } from './models/address';


const AddressEndpoint = 'https://jsonplaceholder.typicode.com/users';

@Injectable()
export class AddressService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAll() {
    // Get all the data from the endpoint.
    // Return as a promise.
    return this.http.get(AddressEndpoint);
  }

  get(id: number): Address {
    throw new Error('NOT IMPLEMENTED');
  }

  insert(addr: Address) {
    throw new Error('NOT IMPLEMENTED');
  }

  remove(id: number) {
    throw new Error('NOT IMPLEMENTED');
  }





}