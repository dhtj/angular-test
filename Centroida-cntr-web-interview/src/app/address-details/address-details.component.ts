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
      let currentExternalAddresses = JSON.parse(localStorage.getItem('myExternalAddresses'));
      if (!currentExternalAddresses) {
        return;
      }
      const self = this;
      // Iterate through all the local addresses.
      currentExternalAddresses.addresses.forEach(function (element) {
        if (element.id ===  self.addressId) {
          // Get the correct address.
          self.city = element.address.city;
          self.street  = element.address.street;
          self.fullName = element.name;
          self.zipCode = element.address.zipCode;
        }
      });
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
    this.addressId = this.route.snapshot.params.id;
    // If not available. Stop.
    if (!this.addressId) {
      return;
    }
    // If ID is not local, get details from the service.
    if (!this.addressId.toString().includes('local')) {
      // Not local.
      // Tell the user, that not local ones cannot be deleted.
      alert('Not local!');
    } else {
      // Local.
      let currentExternalAddresses = JSON.parse(localStorage.getItem('myExternalAddresses'));
      if (!currentExternalAddresses) {
        return;
      }
      const self = this;
      // Index to remove.
      let indexToRemove = '';
      // Iterate through all the local addresses.
      currentExternalAddresses.addresses.forEach(function (element, index) {
        if (element.id ===  self.addressId) {
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
