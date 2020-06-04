import { Component, OnInit } from '@angular/core';
import { Manifestation } from '../../model/Manifestation'
import { LocationDTO } from '../../model/LocationDTO'
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manifestations',
  templateUrl: './manifestations.component.html',
  styleUrls: ['./manifestations.component.scss']
})
export class ManifestationsComponent implements OnInit {

  manifestations: Manifestation[] = [];
  filteredManifestations: Manifestation[] = [];
  locations: LocationDTO[] = [];
  selectedLocation: LocationDTO = new LocationDTO();

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit() {
    this.reload();
  }

  public reload() {
    this.http.get<Manifestation[]>('http://localhost:8080/api/manifestation/allManifestations').subscribe((data) => {
      this.manifestations = data;
      this.filteredManifestations = data;
      this.sortData();
      console.log(data);
      this.http.get<LocationDTO[]>('http://localhost:8080/api/location/allLocation').subscribe((data) => {
        this.locations = data;
        console.log(data);
      });
    });
  }

  public refresh(id: number) {
    var i;
    this.filteredManifestations = [];
    for (i = 0; i < this.manifestations.length; i++) {
      if (this.manifestations[i].locationId == id || id == 0) {
        this.filteredManifestations.push(this.manifestations[i]);
      }
    }

    if(id == 0) {
      this.selectedLocation = new LocationDTO();
      this.selectedLocation.locationName == "No filter";
    } else {
      var j;
      for (j = 0; j < this.locations.length; j++) {
        if (this.locations[j].id == id) {
          console.log(this.locations[j]);
          this.selectedLocation = this.locations[j];
        }
      }
    }
    this.sortData();
  }

  public sortData() {
    console.log("pozvao sort!");
    let sortedManifestations = [];
    let i;
    let j;
    for(i = 0; i < this.filteredManifestations.length; i++){
      for(j = 0; j < this.filteredManifestations.length; j++){
        if(new Date(this.filteredManifestations[j].startTime).getTime() < new Date(this.filteredManifestations[i].startTime).getTime()){
            let temp = this.filteredManifestations[i];
            this.filteredManifestations[i] = this.filteredManifestations[j];
            this.filteredManifestations[j] = temp;
        }
      }
    }
  } 

}
