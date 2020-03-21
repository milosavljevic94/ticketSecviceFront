import { Component, OnInit } from '@angular/core';
import {Manifestation} from '../../model/Manifestation'
import {LocationDTO} from '../../model/LocationDTO'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manifestations',
  templateUrl: './manifestations.component.html',
  styleUrls: ['./manifestations.component.scss']
})
export class ManifestationsComponent implements OnInit {

  manifestations : Manifestation[] = [];
  filteredManifestations : Manifestation[] = [];
  locations : LocationDTO[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.reload();
  }

  public reload() {
    this.http.get<Manifestation[]>('http://localhost:8080/api/manifestation/allManifestations').subscribe((data) => {
      this.manifestations = data;
      this.filteredManifestations = data;
      console.log(data);
      this.http.get<LocationDTO[]>('http://localhost:8080/api/location/allLocation').subscribe((data) => {
      this.locations = data;
      console.log(data);
    });
    });
  }

  public refresh(id : number) {
    var i;
    this.filteredManifestations = [];
    for(i = 0 ; i < this.manifestations.length ; i++) {
      if(this.manifestations[i].locationId == id || id == 0) {
        this.filteredManifestations.push(this.manifestations[i]);
      }
    }    
  }

}
