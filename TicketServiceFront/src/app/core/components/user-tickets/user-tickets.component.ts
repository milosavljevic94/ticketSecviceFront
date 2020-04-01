import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../model/Ticket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { BuyTicketDTO } from '../../model/BuyTicketDTO';
import { Manifestation } from '../../model/Manifestation';
import { ManifestationDays } from '../../model/ManifestationDays';
import { ManifestationSectorPriceDto } from '../../model/ManifestationSectorPriceDto';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';
import { ManifestationDayDto } from '../../model/ManifestationDayDto';
import { LocationDTO } from '../../model/LocationDTO';
@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.scss']
})
export class UserTicketsComponent implements OnInit {

  userTickets: BuyTicketDTO[] = [];
  selectedTicket: BuyTicketDTO = new BuyTicketDTO();

  manifestation: Manifestation = new Manifestation();
  manifestationDay: ManifestationDayDto = new ManifestationDayDto();

  locations: LocationDTO[] = [];


  constructor(private http: HttpClient, private storageService: StorageService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.initializeTickets();
  }

  public selectionChanged(id: number) {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    var i;
    for (i = 0; i < this.userTickets.length; i++) {
      if (this.userTickets[i].ticketId == id) {
        this.selectedTicket = this.userTickets[i];
        this.http.get<ManifestationDayDto>('http://localhost:8080/api/manifestation/manifestationDay/' + this.selectedTicket.dayId, { headers: headers }).subscribe((data) => {
          this.manifestationDay = data;
          this.manifestation = data.manifestation;
        });
      }
    }
  }

  public initializeTickets() {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    this.http.get<BuyTicketDTO[]>('http://localhost:8080/api/ticket/allUserTicket', { headers: headers }).subscribe((data) => {
      this.userTickets = data;
      console.log(data);
      this.selectedTicket = this.userTickets[0];
      this.http.get<ManifestationDayDto>('http://localhost:8080/api/manifestation/manifestationDay/' + this.selectedTicket.dayId, { headers: headers }).subscribe((data) => {
        this.manifestationDay = data;
        this.manifestation = data.manifestation;
        this.http.get<LocationDTO[]>('http://localhost:8080/api/location/allLocation').subscribe((data) => {
          this.locations = data;
        });
      });
    });
  }



  public getSectorName(sectorId: number) {
    let i,j;
    for(i = 0 ; i < this.locations.length ; i++) {
      for(j = 0 ; j < this.locations[i].sectors.length ; j++){
        if(this.locations[i].sectors[j].id == sectorId) {
          return this.locations[i].sectors[j].sectorName;
        }
      }
    }
  }


}
