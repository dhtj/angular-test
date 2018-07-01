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
  ) { }

  ngOnInit() {
    // Subscribe and get data on initialization.
    this.addressService.getAll()
      .subscribe((data) => {
        console.log(data);
      });
  }

  select(addr: Address) {
    this.router.navigate(['address', 1]);
  }

  create() {
    this.router.navigate(['address']);
  }

}
