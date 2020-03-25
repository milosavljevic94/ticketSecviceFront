import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../../model/Address';
import { StorageService } from '../../services/storage/storage.service';
import { LocationDTO } from '../../model/LocationDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locations-admin',
  templateUrl: './locations-admin.component.html',
  styleUrls: ['./locations-admin.component.scss']
})
export class LocationsAdminComponent implements OnInit {

  locations: LocationDTO[] = [];
  addresses: Address[] = [];
  locationCreate: LocationDTO = new LocationDTO();
  addressCreate: Address = new Address();
  id: number;
  private sub: any;

  constructor(private http: HttpClient, private storageService: StorageService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLocations();
  }

  public loadLocations() {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.get<LocationDTO[]>('http://localhost:8080/api/location/allLocation', { headers: headers }).subscribe((data) => {
      this.locations = data;
      console.log(data);
      this.http.get<Address[]>('http://localhost:8080/api/address/allAddress', { headers: headers }).subscribe((data) => {
        this.addresses = data;
        console.log(data);

      });
    });
  }

  public delete(id: number) {
    console.log(id);

    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.delete('http://localhost:8080/api/location/' + id, { headers: headers }).subscribe((data) => {
      alert("Location deleted!");
      this.loadLocations();
    },
      error => {
        alert("Location deleted!");
        this.loadLocations();
      });
  }

  public create() {

    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    this.locationCreate.address = this.addressCreate;

    
    this.http.post('http://localhost:8080/api/location/addLocation', this.locationCreate, { headers: headers }).subscribe((data) => {
      alert("Location created!");
      this.locationCreate = new LocationDTO();
      this.loadLocations();
    },
      error => {
        alert("Location created!");
        this.locationCreate = new LocationDTO();
        this.loadLocations();
      });
  }

  public refresh(id : number) {
    var i;
    for(i = 0 ; i < this.addresses.length ; i++) {
      if(this.addresses[i].id == id) {
        this.addressCreate = this.addresses[i];
      }
    }    
  }

}
