import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Address} from '../../model/Address';
import { StorageService } from '../../services/storage/storage.service';
import { parse } from 'querystring';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addresses : Address[] = [];
  addressCreate : Address = new Address();

  constructor(private http: HttpClient, private storageService: StorageService) { }

  ngOnInit() {
    this.loadAddresses();
  }

  public loadAddresses(){
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.get<Address[]>('http://localhost:8080/api/address/allAddress', {headers:headers}).subscribe((data) => {
      this.addresses = data;
      console.log(data);
      
    });
  }

  public delete(id : number) {
    console.log(id);

    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.delete('http://localhost:8080/api/address/'+id, {headers:headers}).subscribe((data) => {
      alert("Address deleted!");
      this.loadAddresses();
    },
    error => {
      alert("Address deleted!");
      this.loadAddresses();
    });
  }

  public update(id : number) {
    
    let addressUpdate = new Address();
    addressUpdate.id = id;
    addressUpdate.state = (<HTMLInputElement>document.getElementById("state"+id)).value;
    addressUpdate.street = (<HTMLInputElement>document.getElementById("street"+id)).value;
    addressUpdate.city = (<HTMLInputElement>document.getElementById("city"+id)).value;
    addressUpdate.latitude = parseFloat((<HTMLInputElement>document.getElementById("latitude"+id)).value);
    addressUpdate.longitude = parseFloat((<HTMLInputElement>document.getElementById("longitude"+id)).value);
    addressUpdate.number = (<HTMLInputElement>document.getElementById("number"+id)).value;
    
    console.log(addressUpdate);
    
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.put('http://localhost:8080/api/address/updateAddress', addressUpdate, {headers:headers}).subscribe((data) => {
      alert("Address updated!");
      this.loadAddresses();
    },
    error => {
      alert("Address updated!");
      this.loadAddresses();
    });
  }

  public create(id : number) {
    
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.post('http://localhost:8080/api/address/addAddress',this.addressCreate, {headers:headers}).subscribe((data) => {
      alert("Address created!");
      this.addressCreate = new Address();
      this.loadAddresses();
    },
    error => {
      alert("Address created!");
      this.addressCreate = new Address();
      this.loadAddresses();
    });
  }

}
