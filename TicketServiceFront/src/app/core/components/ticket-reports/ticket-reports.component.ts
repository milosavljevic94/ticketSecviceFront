import { Component, OnInit } from '@angular/core';
import { TicketReport } from '../../model/TicketReport';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-ticket-reports',
  templateUrl: './ticket-reports.component.html',
  styleUrls: ['./ticket-reports.component.scss']
})
export class TicketReportsComponent implements OnInit {

  id: string;
  type: string;
  private sub: any;
  report: TicketReport = new TicketReport();
  headTitle: string = "";
  chosenDate: Date = new Date();

  constructor(private http: HttpClient, private storageService: StorageService, private route: ActivatedRoute,
    private datePipe: DatePipe, private authService: AuthService) { }

  ngOnInit() {
    let headers = this.authService.getHeaders();

    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
  
      if (this.type == "locationDay") {

        this.headTitle = "Daily ticket report for location with id: " + this.id;
        
      } else if (this.type == "locationMonth") {
  
        this.headTitle = "Montly ticket report for location with id: " + this.id;
        
      } else if (this.type == "locationYear") {
  
        this.headTitle = "Yearly ticket report for location with id: " + this.id;
        
      } else if (this.type == "manifestation") {
        this.headTitle = "Ticket report for manifestation with id: " + this.id;
        this.http.get<TicketReport>('http://localhost:8080/api/ticket/reportManifestation/' + this.id, { headers: headers }).subscribe((data) => {
          this.report = data;
        });
      } else {
        this.headTitle = "Ticket report for manifestation day with id: " + this.id;
        this.http.get<TicketReport>('http://localhost:8080/api/ticket/reportDayManifestation/' + this.id, { headers: headers }).subscribe((data) => {
          this.report = data;
        });
      }
    });
  }


  public showReport() {
    let formatedDate;
    let headers = this.authService.getHeaders();

    if (this.type == "locationDay") {

      formatedDate = this.datePipe.transform(this.chosenDate, 'yyyy-MM-dd');
      this.http.post<TicketReport>('http://localhost:8080/api/ticket/reportDayLocation/' + this.id, formatedDate, { headers: headers }).subscribe((data) => {
      this.report = data;
      });
      
    } else if (this.type == "locationMonth") {

      formatedDate = this.datePipe.transform(this.chosenDate, 'yyyy-MM');
      this.http.post<TicketReport>('http://localhost:8080/api/ticket/reportMonthLocation/' + this.id, formatedDate, { headers: headers }).subscribe((data) => {
        this.report = data;
      });
      
    } else if (this.type == "locationYear") {

      formatedDate = this.datePipe.transform(this.chosenDate, 'yyyy');
      this.http.post<TicketReport>('http://localhost:8080/api/ticket/reportYearLocation/' + this.id, formatedDate, { headers: headers }).subscribe((data) => {
        this.report = data;
      });
      
    } 
    
  }


}
