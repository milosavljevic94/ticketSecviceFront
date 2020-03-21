import { Component, OnInit } from '@angular/core';
import { LocationDTO } from '../../model/LocationDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { Sector } from '../../model/Sector';
import { Address } from '../../model/Address';

@Component({
  selector: 'app-location-update-admin',
  templateUrl: './location-update-admin.component.html',
  styleUrls: ['./location-update-admin.component.scss']
})
export class LocationUpdateAdminComponent implements OnInit {

  location: LocationDTO = new LocationDTO();
  sectorCreate: Sector = new Sector();
  id: number;
  private sub: any;
  addresses: Address[] = [];
  addressCreate: Address = new Address();

  constructor(private http: HttpClient, private storageService: StorageService,private route: ActivatedRoute) { }


  ngOnInit() {
    this.loadLocation();
  }

  public loadLocation() {
        
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id'];
      this.http.get<LocationDTO>('http://localhost:8080/api/location/'+this.id, { headers: headers }).subscribe((data) => {
        this.location = data;
        this.http.get<Address[]>('http://localhost:8080/api/address/allAddress', { headers: headers }).subscribe((data) => {
        this.addresses = data;
        console.log(data);

      });
      });
    });
  }

  public delete(id: number) {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.delete('http://localhost:8080/api/sector/' + id, { headers: headers }).subscribe((data) => {
      alert("Location deleted!");
      this.loadLocation();
    },
      error => {
        alert("Location deleted!");
        this.loadLocation();
      });
  }

  public create(id: number) {

    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    this.sectorCreate.locationId = this.id;
    this.sectorCreate.seatsNumber = this.sectorCreate.rows + this.sectorCreate.columns;
    
    this.http.post('http://localhost:8080/api/sector/addSector', this.sectorCreate, { headers: headers }).subscribe((data) => {
      alert("Sector added!");
      this.sectorCreate = new Sector();
      this.loadLocation();
    },
      error => {
        alert("Sector added!");
        this.sectorCreate = new Sector();
        this.loadLocation();
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
