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
    // If not available. Stop.
    if (!this.addressId) {
      return;
    }
    // If ID is not local, get details from the service.
    if (!this.addressId.toString().includes('local')) {
      // Not local.
      this.addressService.get(this.addressId)
        .subscribe((data) => {
          let tempAddress = data;
          this.city = tempAddress['address'].city;
          this.street  = tempAddress['address'].street;
          this.fullName = tempAddress['name'];
          this.zipCode = tempAddress['address'].zipcode;
        });
    } else {
      // Local.
    }
  }

  save() {
    // Make sure to have a name, while inserting a new address.
    if (!this.fullName  || this.fullName === '') {
      alert('Insert info!');
      // Stop when needed.
      return;
    }

    // Check local storage for functionality.
    if (this.verifyLocalStorage()){
      let currentExternalAddresses = JSON.parse(localStorage.getItem('myExternalAddresses'));
      if (!currentExternalAddresses) {
        currentExternalAddresses = {
          addresses: []
        };
      }
      // Add the new address to the list of existing ones.
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
      // In this case the local storage is not available.
      alert('Local Storage Not Available. Aborting!');
    }
    this.router.navigate(['']);
  }

  remove() {
    this.router.navigate(['']);
  }

  /**
   * Function for verification that
   * local storage is properly
   * functioning.
   *
   * @returns {boolean}
   */

  verifyLocalStorage () {
    const test = 'testLocalStorage';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(ex) {
      // In case any exemption is thrown,
      // make sure to return with a boolean
      // of false value.
      return false;
    }
  }
}
