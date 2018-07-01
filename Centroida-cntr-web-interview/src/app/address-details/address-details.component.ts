import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../address.service';
import { Address } from '../models/address';
import {s} from "@angular/core/src/render3";

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {

  address: Address;
  addressId: number;
  fullName: string;
  city: string;
  zipCode: string;
  street: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.addressId = this.route.snapshot.params.id;
  }

  save() {
    if (!this.fullName  || this.fullName === '') {
      alert('Insert info!');
      return;
    }

    if (this.verifyLocalStorage()){
      let currentExternalAddresses = JSON.parse(localStorage.getItem('myExternalAddresses'));
      if (!currentExternalAddresses) {
        currentExternalAddresses = {
          addresses: []
        };
      }
      currentExternalAddresses.addresses.push({
        name: this.fullName,
        id: 'local' + currentExternalAddresses.addresses.length,
        address: {
          street: this.street,
          city: this.city,
          zipCode: this.zipCode,
          suite: 'not-available'
        }
      });
      localStorage.setItem('myExternalAddresses',JSON.stringify(currentExternalAddresses));

    } else {
      alert('Local Storage Not Available. Aborting!');
    }
    this.router.navigate(['']);
  }

  remove() {
    this.router.navigate(['']);
  }

  verifyLocalStorage () {
    const test = 'testLocalStorage';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(ex) {
      return false;
    }
  }
}
