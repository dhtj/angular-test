import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../address.service';
import { Address } from '../models/address';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {

  address: Address;
  addressId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.addressId = this.route.snapshot.params.addressId;
  }

  save() {


    this.router.navigate(['']);
  }

  remove() {
    this.router.navigate(['']);
  }

}
