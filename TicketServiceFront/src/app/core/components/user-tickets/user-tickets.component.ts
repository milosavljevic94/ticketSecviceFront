import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../model/Ticket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { BuyTicketDTO } from '../../model/BuyTicketDTO';
import { Manifestation } from '../../model/Manifestation';
import { ManifestationDays } from '../../model/ManifestationDays';
import { ManifestationSectorPriceDto } from '../../model/ManifestationSectorPriceDto';

import { from } from 'rxjs';
import { ManifestationDayDto } from '../../model/ManifestationDayDto';
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

  constructor(private http: HttpClient, private storageService: StorageService) { }

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
      });
    });
  }




  public convertDate(input): string {
    if (input == null) {
      return "";
    }

    let dateParts: string[];
    let dateString = input.toString();
    dateParts = dateString.split('T');

    let dateComponents: string[];
    dateComponents = dateParts[0].split('-');

    let day = dateComponents[2];
    let month = dateComponents[1];
    let year = dateComponents[0];

    let retVal = "";
    retVal = retVal + day + "/" + month + "/" + year;
    return retVal;
  }


}
