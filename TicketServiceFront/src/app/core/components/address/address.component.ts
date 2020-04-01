import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../../model/Address';
import { StorageService } from '../../services/storage/storage.service';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addresses: Address[] = [];
  addressCreate: Address = new Address();

  constructor(private http: HttpClient, private storageService: StorageService, private authService: AuthService) { }

  ngOnInit() {
    this.loadAddresses();
  }

  public loadAddresses() {
    let headers = this.authService.getHeaders();

    this.http.get<Address[]>('http://localhost:8080/api/address/allAddress', { headers: headers }).subscribe((data) => {
      this.addresses = data;
      console.log(data);
    });
  }

  public delete(id: number) {
    let headers = this.authService.getHeaders();

    this.http.delete('http://localhost:8080/api/address/' + id, { headers: headers }).subscribe((data) => {
      this.loadAddresses();
    },
      error => {
        this.loadAddresses();
      });
  }

  public update(id: number) {

    let addressUpdate = new Address();
    addressUpdate.id = id;
    addressUpdate.state = (<HTMLInputElement>document.getElementById("state" + id)).value;
    addressUpdate.street = (<HTMLInputElement>document.getElementById("street" + id)).value;
    addressUpdate.city = (<HTMLInputElement>document.getElementById("city" + id)).value;
    addressUpdate.latitude = parseFloat((<HTMLInputElement>document.getElementById("latitude" + id)).value);
    addressUpdate.longitude = parseFloat((<HTMLInputElement>document.getElementById("longitude" + id)).value);
    addressUpdate.number = (<HTMLInputElement>document.getElementById("number" + id)).value;

    if (!this.validation(addressUpdate)) {
      this.loadAddresses();
      return;
    }

    let headers = this.authService.getHeaders();

    this.http.put('http://localhost:8080/api/address/updateAddress', addressUpdate, { headers: headers }).subscribe((data) => {
      alert("Address updated!");
      this.loadAddresses();
    });
  }

  public create(id: number) {

    if (!this.validation(this.addressCreate)) {
      return;
    }

    let headers = this.authService.getHeaders();

    this.http.post('http://localhost:8080/api/address/addAddress', this.addressCreate, { headers: headers }).subscribe((data) => {
      this.addressCreate = new Address();
      this.loadAddresses();
    });
  }

  public validation(address: Address) {
    console.log(address);
    if (address.city === "" || address.number === "" || address.street === "" || address.state === "" || address.longitude == null || address.latitude == null) {
      alert("Please fill in all fields!");
      return false;
    }

    return true;
  }

}
