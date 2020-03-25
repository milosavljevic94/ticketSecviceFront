import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../model/Reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { BuyTicketDTO } from '../../model/BuyTicketDTO';

@Component({
  selector: 'app-reservations-admin',
  templateUrl: './reservations-admin.component.html',
  styleUrls: ['./reservations-admin.component.scss']
})
export class ReservationsAdminComponent implements OnInit {

  reservations: Reservation[] = [];
  reservationCreate: Reservation = new Reservation();
  usernameForCreate: string = "";
  ticketCreate: BuyTicketDTO = new BuyTicketDTO();


  constructor(private http: HttpClient, private storageService: StorageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadReservations();
  }

  public loadReservations() {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.get<Reservation[]>('http://localhost:8080/api/reservation/allReservation', { headers: headers }).subscribe((data) => {
      this.reservations = data;
      console.log(data);
    });
  }

  public create() {

    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.post('http://localhost:8080/api/reservation/addReservation', this.reservationCreate, { headers: headers }).subscribe((data) => {
      alert("Reservation created!");
      this.reservationCreate = new Reservation();
      this.loadReservations();
    },
      error => {
        alert("Reservation created!");
        this.reservationCreate = new Reservation();
        this.loadReservations();
      });
  }

  public delete(id: number) {

    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    this.http.delete('http://localhost:8080/api/reservation/cancelReservation/' + id, { headers: headers }).subscribe((data) => {
      alert("Reservation deleted!");
      this.loadReservations();
    },
      error => {
        alert("Location deleted!");
        this.loadReservations();
      });
  }

  public update(id : number) {
    
    let reservationUpdate = new Reservation();
    let i;
    for(i = 0 ; i < this.reservations.length ; i++) {
      if(this.reservations[i].id == id) {
        reservationUpdate = this.reservations[i];
      }
    }
    

    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    console.log(reservationUpdate);
    return;
    this.http.put('http://localhost:8080/api/reservation/updateReservation', reservationUpdate, {headers:headers}).subscribe((data) => {
      alert("Reservation updated!");
      this.loadReservations();
    },
    error => {
      alert("Reservations updated!");
      this.loadReservations();
    });
  }




}
