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

  get(id: number) {
    // Let's have a single user.
    let addressToRequest = AddressEndpoint + '/' + id;
    return this.http.get(addressToRequest);
  }

  insert(addressData) {
    let currentExternalAddresses = JSON.parse(localStorage.getItem('myExternalAddresses'));
    if (!currentExternalAddresses) {
      currentExternalAddresses = {
        addresses: []
      };
    }
    // Add the new address to the list of existing ones.
    currentExternalAddresses.addresses.push({
      name: addressData.fullName,
      id: 'local' + currentExternalAddresses.addresses.length,
      address: {
        street: addressData.street,
        city: addressData.city,
        zipCode: addressData.zipCode,
        suite: 'not-available'
      }
    });
    localStorage.setItem('myExternalAddresses',JSON.stringify(currentExternalAddresses));
  }

  remove(id: number) {
    let currentExternalAddresses = JSON.parse(localStorage.getItem('myExternalAddresses'));
    if (!currentExternalAddresses) {
      return;
    }
    // Index to remove.
    let indexToRemove = '';
    // Iterate through all the local addresses.
    currentExternalAddresses.addresses.forEach(function (element, index) {
      if (element.id ===  id) {
        indexToRemove = index;
      }
    });
    if (indexToRemove === '') {
      alert('Not in the database!');
      return;
    }
    // Splice (remove) the element.
    currentExternalAddresses.addresses.splice(indexToRemove, 1);
    // Set the new value.
    localStorage.setItem('myExternalAddresses',JSON.stringify(currentExternalAddresses));
  }





}
