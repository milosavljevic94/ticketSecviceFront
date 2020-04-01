import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../../model/Address';
import { StorageService } from '../../services/storage/storage.service';
import { LocationDTO } from '../../model/LocationDTO';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-locations-admin',
  templateUrl: './locations-admin.component.html',
  styleUrls: ['./locations-admin.component.scss']
})
export class LocationsAdminComponent implements OnInit {

  locations: LocationDTO[] = [];
  addresses: Address[] = [];
  locationCreate: LocationDTO = new LocationDTO();
  selectedAddress: Address = new Address();
  id: number;
  private sub: any;

  constructor(private http: HttpClient, private storageService: StorageService,private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.loadLocations();
  }

  public loadLocations() {
    let headers = this.authService.getHeaders();

    this.http.get<LocationDTO[]>('http://localhost:8080/api/location/allLocation', { headers: headers }).subscribe((data) => {
      this.locations = data;
      this.http.get<Address[]>('http://localhost:8080/api/address/allAddress', { headers: headers }).subscribe((data) => {
        this.addresses = data;
        this.selectedAddress = this.addresses[0];
      });
    });
  }

  public delete(id: number) {
    let headers = this.authService.getHeaders();

    this.http.delete('http://localhost:8080/api/location/' + id, { headers: headers }).subscribe((data) => {
      this.loadLocations();
    });
  }

  public create() {

    let headers = this.authService.getHeaders();
    
    this.locationCreate.address = this.selectedAddress;
    
    if(!this.validation(this.locationCreate)){
      this.loadLocations();
      return;
    }

    this.http.post('http://localhost:8080/api/location/addLocation', this.locationCreate, { headers: headers }).subscribe((data) => {
      this.locationCreate = new LocationDTO();
      this.loadLocations();
    },
      error => {
        this.locationCreate = new LocationDTO();
        this.loadLocations();
      });
  }

  public refresh(id : number) {
    var i;
    for(i = 0 ; i < this.addresses.length ; i++) {
      if(this.addresses[i].id == id) {
        this.selectedAddress = this.addresses[i];
      }
    }    
  }

  public validation(location: LocationDTO) {
    if(location.locationName === "" || this.selectedAddress.state === "") {
      alert("Please fill in all fields!");
      return false;
    }

    return true;
  }
}
