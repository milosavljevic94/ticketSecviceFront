import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Manifestation } from '../../model/Manifestation';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { DatePipe } from '@angular/common';
import { LocationDTO } from '../../model/LocationDTO';
import { ManifestationInfo } from '../../model/ManifestationInfo';
import { ManifestationDays } from '../../model/ManifestationDays';
import { ManifestationDayUpdateDto } from '../../model/ManifestationDayUpdateDto';
import { ManifestationCreateDTO } from '../../model/ManifestationCreateDTO';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { ManifestationSectorPrice } from '../../model/ManifestationSectorPrice';

@Component({
  selector: 'app-sectors-admin',
  templateUrl: './sectors-admin.component.html',
  styleUrls: ['./sectors-admin.component.scss']
})
export class SectorsAdminComponent implements OnInit {

  manifestation: Manifestation = new Manifestation();
  id: number;
  private sub: any;
  location: LocationDTO = new LocationDTO();
  manifestationInfo: ManifestationInfo = new ManifestationInfo();

  constructor(private http: HttpClient, private route: ActivatedRoute, private storageService: StorageService, 
    private datePipe: DatePipe, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loadManifestation();
  }

  public loadManifestation() {
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id'];
      this.http.get<Manifestation>('http://localhost:8080/api/manifestation/' + this.id).subscribe((data) => {
        this.manifestation = data;
        console.log("manifestation");
        console.log(this.manifestation);
        this.http.get<LocationDTO>('http://localhost:8080/api/location/' + data.locationId).subscribe((data) => {
          this.location = data;
          console.log("Lokacija");
          console.log(this.location);
          this.http.get<ManifestationInfo>('http://localhost:8080/api/manifestation/manifestationInfo/' + this.id).subscribe((data) => {
            this.manifestationInfo = data;
            console.log("Info");
            console.log(this.manifestationInfo);

          });
        });
      });
    });
  }

  public getPrice(idManDay: number, idSector: number) {
    var i;
    for (i = 0; i < this.manifestationInfo.sectorPrices.length; i++) {

      if (this.manifestationInfo.sectorPrices[i].manDayId == idManDay && this.manifestationInfo.sectorPrices[i].sectorId == idSector) {
        return this.manifestationInfo.sectorPrices[i].price;
      }
    }
  }

  public updateSectorPrice(manifestationDayId : number, idSector: number) {

    let manifestationSectorPrice = new ManifestationSectorPrice();

    manifestationSectorPrice.dayId = manifestationDayId;
    manifestationSectorPrice.sectorId = idSector;
    manifestationSectorPrice.price = parseFloat((<HTMLInputElement>document.getElementById(manifestationDayId+"price"+idSector)).value);

    console.log(manifestationSectorPrice);
    
    let headers = this.authService.getHeaders();

    this.http.put<ManifestationInfo>('http://localhost:8080/api/manifestation/addSectorPrice/' + this.id, manifestationSectorPrice, { headers: headers }).subscribe((data) => {
      alert("Price added!");
      this.loadManifestation();
    });
  }

  public updateManifestationDay(manifestationDay: ManifestationDays) {
    let manifestationDayUpdateDto = new ManifestationDayUpdateDto();
    manifestationDayUpdateDto.id = manifestationDay.id;
    manifestationDayUpdateDto.manifestationId = this.id;
    manifestationDayUpdateDto.description = manifestationDay.description;
    manifestationDayUpdateDto.name = manifestationDay.name;

    let startTime = JSON.stringify(manifestationDay.startTime);
    startTime = startTime.split('.')[0];
    manifestationDayUpdateDto.startTime = startTime.substr(1, startTime.length);

    if (manifestationDayUpdateDto.startTime.endsWith('"')) {
      manifestationDayUpdateDto.startTime = manifestationDayUpdateDto.startTime.substr(0, manifestationDayUpdateDto.startTime.length - 1);
    }

    console.log(manifestationDayUpdateDto);
    let headers = this.authService.getHeaders();
    this.http.put<Manifestation>('http://localhost:8080/api/manifestation/updateManDay/' + this.id, manifestationDayUpdateDto, { headers: headers }).subscribe((data) => {
      this.manifestation = data;
      alert("Manifestation day updated!");
      this.loadManifestation();

    });
  }




}
