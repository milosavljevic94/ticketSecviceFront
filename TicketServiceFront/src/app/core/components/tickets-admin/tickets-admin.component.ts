import { Component, OnInit } from '@angular/core';
import { BuyTicketDTO } from "../../model/BuyTicketDTO";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { ManifestationDayDto } from "../../model/ManifestationDayDto";
import { Manifestation } from '../../model/Manifestation';
import { LocationDTO } from '../../model/LocationDTO';
import { ManifestationDays } from '../../model/ManifestationDays';
import { Sector } from '../../model/Sector';
import { Ticket } from '../../model/Ticket';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-tickets-admin',
  templateUrl: './tickets-admin.component.html',
  styleUrls: ['./tickets-admin.component.scss']
})
export class TicketsAdminComponent implements OnInit {

  tickets: BuyTicketDTO[] = [];
  manifestations: Manifestation[] = [];
  locations: LocationDTO[] = [];

  //for create
  ticketCreate: BuyTicketDTO = new BuyTicketDTO();
  selectedManifestation: Manifestation = new Manifestation();
  selectedManifestationDay: ManifestationDays = new ManifestationDays();
  selectedLocation: LocationDTO = new LocationDTO();

  selectedSector: Sector = new Sector();

  allManifestationDays: ManifestationDays[] = [];

  chosenDate: Date = new Date();

  constructor(private http: HttpClient, private storageService: StorageService, private route: ActivatedRoute, private datePipe: DatePipe, private authService: AuthService) { }

  ngOnInit() {
    this.loadTickets();
    this.loadManifestations();
    this.loadLocations();
  }

  public loadTickets() {
    let headers = this.authService.getHeaders();

    this.http.get<BuyTicketDTO[]>('http://localhost:8080/api/ticket/allTicket', { headers: headers }).subscribe((data) => {
      this.tickets = data;
      console.log(data);
    });
  }

  public loadManifestations() {
    let headers = this.authService.getHeaders();

    this.http.get<Manifestation[]>('http://localhost:8080/api/manifestation/allManifestations', { headers: headers }).subscribe((data) => {
      this.manifestations = data;
      console.log(this.manifestations);
      var i;
      let j;
      for(i=0;i<this.manifestations.length;i++){
        for(j = 0 ; j < this.manifestations[i].manDaysDto.length ; j++) {
          this.allManifestationDays.push(this.manifestations[i].manDaysDto[j]);
        }
      }
      console.log(this.allManifestationDays);
    });
  }

  public loadLocations() {
    let headers = this.authService.getHeaders();

    this.http.get<LocationDTO[]>('http://localhost:8080/api/location/allLocation', { headers: headers }).subscribe((data) => {
      this.locations = data;
      console.log(this.locations);
    });
  }

  public getManifestationDayName(idManifestationDay: number) {
    let i;
    let j;
    for (i = 0; i < this.manifestations.length; i++) {
      for (j = 0; j < this.manifestations[i].manDaysDto.length; j++) {
        if (this.manifestations[i].manDaysDto[j].id == idManifestationDay) {
          return this.manifestations[i].manDaysDto[j].name;
        }
      }
    }

    return "Can't find name";
  }

  public getManifestationName(idManifestationDay: number) {
    let i;
    let j;
    for (i = 0; i < this.manifestations.length; i++) {
      for (j = 0; j < this.manifestations[i].manDaysDto.length; j++) {
        if (this.manifestations[i].manDaysDto[j].id == idManifestationDay) {

          return this.manifestations[i].name;
        }
      }
    }

    return "Can't find name";
  }

  public getSectorName(idSector: number) {
    let i;
    let j;
    for (i = 0; i < this.locations.length; i++) {
      for (j = 0; j < this.locations[i].sectors.length; j++) {
        if (this.locations[i].sectors[j].id == idSector) {

          return this.locations[i].sectors[j].sectorName;
        }
      }
    }

    return "Can't find name";
  }

  public getLocationName(idSector: number) {
    let i;
    let j;
    for (i = 0; i < this.locations.length; i++) {
      for (j = 0; j < this.locations[i].sectors.length; j++) {
        if (this.locations[i].sectors[j].id == idSector) {

          return this.locations[i].locationName;
        }
      }
    }

    return "Can't find name";
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
    this.ticketCreate.purchaseConfirmed = true;
    this.ticketCreate.wantedSeat.manSectorId = this.selectedSector.id;

    console.log(this.ticketCreate);

    if(!this.validateTicket(this.ticketCreate)){
      return;
    }

    let headers = this.authService.getHeaders();

    this.http.post<Ticket>('http://localhost:8080/api/ticket/buyTicket', this.ticketCreate, { headers: headers }).subscribe((data) => {
      this.loadTickets();
      this.loadManifestations();
      this.loadLocations();
      this.ticketCreate = new BuyTicketDTO();
      this.selectedManifestation = new Manifestation();
      this.selectedManifestationDay = new ManifestationDays();
      this.selectedLocation = new LocationDTO();
      this.selectedSector = new Sector();
    });
  }

  public delete(id: number) {
    let headers = this.authService.getHeaders();

    this.http.delete('http://localhost:8080/api/ticket/' + id, { headers: headers }).subscribe((data) => {
      this.loadTickets();
      this.loadManifestations();
      this.loadLocations();
    });
  }

  public update(id: number) {
    let ticket = new Ticket();
    let i;

    for (i = 0; i < this.tickets.length; i++) {
      if (this.tickets[i].ticketId === id) {
        ticket.id = this.tickets[i].ticketId;
        ticket.rowNum = this.tickets[i].wantedSeat.row;
        ticket.seatNum = this.tickets[i].wantedSeat.seatNumber;
      }
    }

    if(!this.validateTicketUpdate(ticket)){
      return;
    }

    let headers = this.authService.getHeaders();

    this.http.put('http://localhost:8080/api/ticket/updateTicket', ticket, { headers: headers }).subscribe((data) => {
      alert("Ticket updated!");
      this.loadTickets();
      this.loadManifestations();
      this.loadLocations();
    });
  }

  public validateTicket(ticket: BuyTicketDTO) {
    if(ticket.dayId == undefined || ticket.wantedSeat.manSectorId == undefined || ticket.wantedSeat.row == null || ticket.wantedSeat.seatNumber == null) {
      alert("Please fill in all fileds!");
      return false;
    }

    return true;
  }

  public validateTicketUpdate(ticket: Ticket) {
    if(ticket.rowNum == null || ticket.seatNum == null) {
      alert("Please fill in all fileds!");
      return false;
    }

    return true;
  }

}
