import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '../address.service';
import { Address } from '../models/address';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  addresses: Address[];

  constructor(
    private router: Router,
    private addressService: AddressService
  ) {
    // Initialize the addresses with an empty array.
    this.addresses = [];
  }

  ngOnInit() {
    const self = this;
    // Subscribe and get data on initialization.
    this.addressService.getAll()
      .subscribe((data) => {
        Object.values(data).forEach(function (element) {
          self.addresses.push(new Address(
            element.id,
            element.name,
            {
              street: element.address.street,
              suite: element.address.suite,
              city: element.address.city,
              zipcode: element.address.zipcode
            }
          ));
        });
      });

    // Get the local database ones.
    let currentExternalAddresses = JSON.parse(localStorage.getItem('myExternalAddresses'));
    if (!currentExternalAddresses) {
      return;
    }
    // Add the new external addresses.
    currentExternalAddresses.addresses.forEach(function (element) {
      self.addresses.push(new Address(
        element.id,
        element.name,
        {
          street: element.address.street,
          suite: element.address.suite,
          city: element.address.city,
          zipcode: element.address.zipcode
        }
      ));
    });
  }

  select(addr: Address) {
    // When selecting, make sure to select the proper id.
    this.router.navigate(['address', addr.id]);
  }

  create() {
    this.router.navigate(['address']);
  }

}
