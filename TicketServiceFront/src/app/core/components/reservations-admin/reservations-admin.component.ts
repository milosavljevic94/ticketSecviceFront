import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../model/Reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { BuyTicketDTO } from '../../model/BuyTicketDTO';
import { Manifestation } from '../../model/Manifestation';
import { LocationDTO } from '../../model/LocationDTO';
import { ManifestationDays } from '../../model/ManifestationDays';
import { Sector } from '../../model/Sector';
import { UserDTO } from '../../model/UserDTO';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-reservations-admin',
  templateUrl: './reservations-admin.component.html',
  styleUrls: ['./reservations-admin.component.scss']
})
export class ReservationsAdminComponent implements OnInit {

  reservations: Reservation[] = [];
  ticketCreate: BuyTicketDTO = new BuyTicketDTO();
  
  manifestations: Manifestation[] = [];
  locations: LocationDTO[] = [];

  //for create
  selectedManifestation: Manifestation = new Manifestation();
  selectedManifestationDay: ManifestationDays = new ManifestationDays();
  selectedLocation: LocationDTO = new LocationDTO();
  selectedSector: Sector = new Sector();


  constructor(private http: HttpClient, private storageService: StorageService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.loadReservations();
    this.loadManifestations();
    this.loadLocations();
  }

  public loadReservations() {
    let headers = this.authService.getHeaders();

    this.http.get<Reservation[]>('http://localhost:8080/api/reservation/allReservation', { headers: headers }).subscribe((data) => {
      this.reservations = data;
      console.log(data);
    });
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

  public refreshManifestation(id: number) {
    var i;
    var j;

    for (i = 0; i < this.manifestations.length; i++) {
      if (this.manifestations[i].id == id) {
        this.selectedManifestation = this.manifestations[i];
        for (j = 0; j < this.locations.length; j++) {
          if (this.locations[j].id == this.selectedManifestation.locationId) {
            this.selectedLocation = this.locations[j];
          }
        }
      }
    }
    console.log(this.selectedManifestation);
  }

  public refreshManifestationDay(id: number) {
    var i;
    for (i = 0; i < this.selectedManifestation.manDaysDto.length; i++) {
      if (this.selectedManifestation.manDaysDto[i].id == id) {
        this.selectedManifestationDay = this.selectedManifestation.manDaysDto[i];
      }
    }
    console.log(this.selectedManifestationDay);
  }

  public refreshSector(id: number) {
    var i;
    for (i = 0; i < this.selectedLocation.sectors.length; i++) {
      if (this.selectedLocation.sectors[i].id == id) {
        this.selectedSector = this.selectedLocation.sectors[i];
      }
    }
    console.log(this.selectedSector);
  }

  
  public create() {

    this.ticketCreate.dayId = this.selectedManifestationDay.id;
    this.ticketCreate.wantedSeat.manSectorId = this.selectedSector.id;

    if(!this.validateTicket(this.ticketCreate)) {
      return;
    }
    
    let headers = this.authService.getHeaders();

    this.http.put('http://localhost:8080/api/ticket/reserveTicket', this.ticketCreate, { headers: headers }).subscribe((data) => {
      this.ticketCreate = new BuyTicketDTO();
      this.selectedLocation = new LocationDTO();
      this.selectedSector = new Sector();
      this.selectedManifestation = new Manifestation();
      this.selectedManifestationDay = new ManifestationDays();

      this.loadReservations();
      this.loadManifestations();
      this.loadLocations();
    });
  }

  public delete(id: number) {

    let headers = this.authService.getHeaders();

    this.http.delete('http://localhost:8080/api/reservation/cancelReservation/' + id, { headers: headers }).subscribe((data) => {
      this.loadReservations();
    },
      error => {
        alert("You can not cancel other users reservation!");
        this.loadReservations();
      });
  }


  public validateTicket(ticket: BuyTicketDTO) {
    if(ticket.dayId == undefined || ticket.wantedSeat.manSectorId == undefined || ticket.wantedSeat.row == null || ticket.wantedSeat.seatNumber == null) {
      alert("Please fill in all fileds!");
      return false;
    }

    return true;
  }
  



}
