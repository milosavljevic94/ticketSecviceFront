import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../model/Reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../../model/Ticket';
import { StorageService } from '../../services/storage/storage.service';
import { Manifestation } from '../../model/Manifestation';
import { ManifestationDayDto } from '../../model/ManifestationDayDto';
import { BuyTicketDTO } from '../../model/BuyTicketDTO';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent implements OnInit {

  userReservations: Reservation[] = [];
  selectedReservation: Reservation = new Reservation();


  ticket: BuyTicketDTO = new BuyTicketDTO();
  manifestation: Manifestation = new Manifestation();
  manifestationDay: ManifestationDayDto = new ManifestationDayDto();

  constructor(private http: HttpClient, private storageService: StorageService) { }

  ngOnInit() {

    this.initializeReservations();
  }



  public selectionChanged(id: number) {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    var i;
    for (i = 0; i < this.userReservations.length; i++) {
      if (this.userReservations[i].id == id) {
        this.selectedReservation = this.userReservations[i];
        this.ticket = this.selectedReservation.ticket;
        this.http.get<ManifestationDayDto>('http://localhost:8080/api/manifestation/manifestationDay/' + this.selectedReservation.ticket.dayId, { headers: headers }).subscribe((data) => {
          this.manifestationDay = data;
          this.manifestation = data.manifestation;
        });
      }
    }
  }

  public buyTicket() {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    this.http.get<Ticket>('http://localhost:8080/api/ticket/buyReservedTicket/' + this.selectedReservation.id, { headers: headers }).subscribe((data) => {
      alert("Ticket bought successfully!");
      this.initializeReservations();
    },
      error => {
        alert("Ticket bought successfully!");
        this.initializeReservations();
      });
  }

  public cancelReservation() {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    this.http.delete('http://localhost:8080/api/reservation/cancelReservation/' + this.selectedReservation.id, { headers: headers }).subscribe((data) => {
      alert("Reservation cancelled!");
      this.initializeReservations();
    },
      error => {
        alert("Reservation cancelled!");
        this.initializeReservations();
      });
  }



  public initializeReservations() {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);
    this.http.get<Reservation[]>('http://localhost:8080/api/reservation/allUserReservation', { headers: headers }).subscribe((data) => {
      this.userReservations = data;
      this.selectedReservation = this.userReservations[0];
      this.ticket = this.selectedReservation.ticket;
      this.http.get<ManifestationDayDto>('http://localhost:8080/api/manifestation/manifestationDay/' + this.selectedReservation.ticket.dayId, { headers: headers }).subscribe((data) => {
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
