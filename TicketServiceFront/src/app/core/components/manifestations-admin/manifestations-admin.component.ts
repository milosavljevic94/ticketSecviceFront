import { Component, OnInit } from '@angular/core';
import { Manifestation } from '../../model/Manifestation';
import { LocationDTO } from '../../model/LocationDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { stringify } from 'querystring';
import { ManifestationCreateDTO } from '../../model/ManifestationCreateDTO'
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-manifestations-admin',
  templateUrl: './manifestations-admin.component.html',
  styleUrls: ['./manifestations-admin.component.scss']
})
export class ManifestationsAdminComponent implements OnInit {

  manifestations: Manifestation[] = [];
  locations: LocationDTO[] = [];
  date: Date = new Date();
  categories: string[] = ["CONCERT", "SPORTS", "THEATER"];
  startTime: Date = new Date();
  endTime: Date = new Date();

  selectedLocation: LocationDTO = new LocationDTO();
  manifestationCreate: ManifestationCreateDTO = new ManifestationCreateDTO();
  selectedCategory: string = this.categories[0];

  selectedLocationUpdate: LocationDTO = new LocationDTO();
  selectedCategoryUpdate: string = this.categories[0];
  manifestationUpdate: ManifestationCreateDTO = new ManifestationCreateDTO();


  constructor(private http: HttpClient,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadManifestations();
    this.loadLocations();
  }

  public loadManifestations() {
    let headers = this.authService.getHeaders();

    this.http.get<Manifestation[]>('http://localhost:8080/api/manifestation/allManifestations', { headers: headers }).subscribe((data) => {
      this.manifestations = data;
      console.log(this.manifestations);
    });
  }

  public loadLocations() {
    let headers = this.authService.getHeaders();

    this.http.get<LocationDTO[]>('http://localhost:8080/api/location/allLocation', { headers: headers }).subscribe((data) => {
      this.locations = data;
      console.log(this.locations);
    });
  }

  public getLocationName(id: number) {
    let i;

    for (i = 0; i < this.locations.length; i++) {
      if (this.locations[i].id == id) {
        return this.locations[i].locationName;
      }
    }

    return "Can't find name";
  }

  public getFormattedDate(date: Date) {
    return new FormControl(date);
  }

  public refreshLocation(id: number) {
    var i;
    for (i = 0; i < this.locations.length; i++) {
      if (this.locations[i].id == id) {
        this.selectedLocation = this.locations[i];
      }
    }
    console.log(this.selectedLocation);
  }

  public refreshLocationUpdate(idLocation: number, idManifestation) {
    var i, j;
    for (i = 0; i < this.manifestations.length; i++) {
      if (this.manifestations[i].id == idManifestation) {
        this.manifestations[i].locationId = idLocation;
      }
    }
    console.log(this.selectedLocationUpdate);
  }

  public create() {
    this.manifestationCreate.manDaysDto = [];
    this.manifestationCreate.manifestationCategory = this.selectedCategory;

    this.manifestationCreate.startTime = JSON.stringify(this.startTime);
    this.manifestationCreate.endTime = JSON.stringify(this.endTime);
    this.manifestationCreate.startTime = this.manifestationCreate.startTime.split('.')[0];
    this.manifestationCreate.endTime = this.manifestationCreate.endTime.split('.')[0];
    this.manifestationCreate.startTime = this.manifestationCreate.startTime.substr(1, this.manifestationCreate.startTime.length);
    this.manifestationCreate.endTime = this.manifestationCreate.endTime.substr(1, this.manifestationCreate.endTime.length);
    this.manifestationCreate.locationId = this.selectedLocation.id;
    console.log(this.manifestationCreate);

    if(!this.validateManifestation(this.manifestationCreate)){
      this.loadManifestations();
      this.loadLocations();
      return;
    }

    let headers = this.authService.getHeaders();

    this.http.post<Manifestation>('http://localhost:8080/api/manifestation/addManifestation', this.manifestationCreate, { headers: headers }).subscribe((data) => {
      this.loadManifestations();
      this.loadLocations();
      this.manifestationCreate = new ManifestationCreateDTO();
      this.selectedLocation = new LocationDTO();
      this.selectedCategory = this.categories[0];
    });
  }

  public refreshCategory(category: string) {
    this.selectedCategory = category;
  }

  public refreshCategoryUpdate(idManifestation: number, category: string) {
    var i;
    for (i = 0; i < this.manifestations.length; i++) {
      if (this.manifestations[i].id == idManifestation) {
        this.manifestations[i].manifestationCategory = category;
      }
    }
  }


  public delete(id: number) {
    let headers = this.authService.getHeaders();

    this.http.delete('http://localhost:8080/api/manifestation/' + id, { headers: headers }).subscribe((data) => {
      this.loadManifestations();
      this.loadLocations();
    });
  }

  public update(id: number) {
    let headers = this.authService.getHeaders();

    let manifestation = new ManifestationCreateDTO();
    let i;

    for (i = 0; i < this.manifestations.length; i++) {
      if (this.manifestations[i].id === id) {
        manifestation.id = this.manifestations[i].id;
        manifestation.description = this.manifestations[i].description;
        manifestation.name = this.manifestations[i].name;
        manifestation.manifestationCategory = this.manifestations[i].manifestationCategory;

        let startTime = JSON.stringify(this.manifestations[i].startTime);
        let endTime = JSON.stringify(this.manifestations[i].endTime);;
        startTime = startTime.split('.')[0];
        endTime = endTime.split('.')[0];
        manifestation.startTime = startTime.substr(1, startTime.length);
        manifestation.endTime = endTime.substr(1, endTime.length);
        
        if(manifestation.startTime.endsWith('"')) {
          manifestation.startTime = manifestation.startTime.substr(0, manifestation.startTime.length-1);
        }
        if(manifestation.endTime.endsWith('"')) {
          manifestation.endTime = manifestation.endTime.substr(0, manifestation.endTime.length-1);
        } 
        
        
        console.log(manifestation);

        
      }
    }
    
    this.http.put('http://localhost:8080/api/manifestation/updateManifestation', manifestation, { headers: headers }).subscribe((data) => {
      this.loadManifestations();
      this.loadLocations();
    },
      error => {
        alert("Manifestation updated!");
        this.loadManifestations();
        this.loadLocations();
      });
    
   }


   public validateManifestation(manifestation : ManifestationCreateDTO) {
    if(manifestation.name === "" || manifestation.description === "" || manifestation.startTime === "" || manifestation.endTime === "" || 
        manifestation.manifestationCategory === "" || manifestation.locationId == undefined || manifestation.startTime === "ull" || manifestation.endTime === "ull") {
          alert("Please fill in all required fields!");
          return false;
        }

        return true;
  }


}
