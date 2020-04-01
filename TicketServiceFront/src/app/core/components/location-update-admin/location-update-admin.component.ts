import { Component, OnInit } from '@angular/core';
import { LocationDTO } from '../../model/LocationDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { Sector } from '../../model/Sector';
import { Address } from '../../model/Address';
import { AuthService } from '../../../modules/auth/services/auth.service';

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
  

  constructor(private http: HttpClient, private storageService: StorageService,private route: ActivatedRoute, private authService: AuthService) { }


  ngOnInit() {
    this.loadLocation();
  }


  public loadLocation() {
        
    let headers = this.authService.getHeaders();

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
    let headers = this.authService.getHeaders();

    this.http.delete('http://localhost:8080/api/sector/' + id, { headers: headers }).subscribe((data) => {
      this.loadLocation();
    });
  }


  public create(id: number) {

    this.sectorCreate.locationId = this.id;
    this.sectorCreate.seatsNumber = this.sectorCreate.rows + this.sectorCreate.columns;
    
    if(!this.validateSector(this.sectorCreate)){
      return;
    }

    let headers = this.authService.getHeaders();
        
    this.http.post('http://localhost:8080/api/sector/addSector', this.sectorCreate, { headers: headers }).subscribe((data) => {
      this.sectorCreate = new Sector();
      this.loadLocation();
    });
  }


  public updateLocation(){

    if(!this.validateLocation(this.location)){
      this.loadLocation();
      return;
    }

    let headers = this.authService.getHeaders();

    this.http.put('http://localhost:8080/api/location/updateLocation', this.location, { headers: headers }).subscribe((data) => {
      alert("Location updated!");
      this.loadLocation();
    },
      error => {
        this.loadLocation();
      });
  }

  public updateSector(idSector : number){
    let headers = this.authService.getHeaders();

    let sector = new Sector();
    let i;

    for(i = 0 ; i < this.location.sectors.length; i++) {
      if(this.location.sectors[i].id === idSector) {
        sector = this.location.sectors[i];
      }
    }

    sector.seatsNumber = sector.rows*sector.columns;

    if(!this.validateSector(sector)){
      this.loadLocation();
      return;
    }

    this.http.put('http://localhost:8080/api/sector/updateSector', sector, { headers: headers }).subscribe((data) => {
      alert("Sector updated!");
      this.loadLocation();
    },
      error => {
        this.loadLocation();
      });
  }

  
  public refresh(id : number) {
    var i;
    for(i = 0 ; i < this.addresses.length ; i++) {
      if(this.addresses[i].id == id) {
        this.location.address = this.addresses[i];
      }
    }
  }


  public validateSector(sector: Sector){
    if(sector.sectorName === "" || sector.rows == null || sector.columns == null){
      alert('Please fill in all fields!');
      return false;
    }

    return true;
  }

  public validateLocation(location: LocationDTO){
    if(location.locationName === ""){
      alert('Please fill in all fields!');
      return false;
    }

    return true;
  }

}
