import { Component, OnInit } from '@angular/core';
import { TicketReport } from '../../model/TicketReport';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-reports',
  templateUrl: './ticket-reports.component.html',
  styleUrls: ['./ticket-reports.component.scss']
})
export class TicketReportsComponent implements OnInit {

  id: number;
  type: string;
  private sub: any;
  report: TicketReport = new TicketReport();
  headTitle: string = "";

  constructor(private http: HttpClient, private storageService: StorageService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set('Authorization', token);

    let date = new Date();



    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      this.id = + params['id'];
      let formatedDate;

      if (this.type == "locationDay") {

        this.headTitle = "Daily ticket report for location with id " + this.id;
        formatedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
        console.log(formatedDate);
        this.http.post<TicketReport>('http://localhost:8080/api/ticket/reportDayLocation/' + this.id, formatedDate, { headers: headers }).subscribe((data) => {
          this.report = data;
        });

      } else if (this.type == "locationMonth") {

        this.headTitle = "Montly ticket report for location with id " + this.id;
        formatedDate = this.datePipe.transform(date, 'yyyy-MM');
        console.log(formatedDate);
        this.http.post<TicketReport>('http://localhost:8080/api/ticket/reportMonthLocation/' + this.id, formatedDate, { headers: headers }).subscribe((data) => {
          this.report = data;
        });

      } else if (this.type == "locationYear") {

        this.headTitle = "Yearly ticket report for location with id " + this.id;
        formatedDate = this.datePipe.transform(date, 'yyyy');
        console.log(formatedDate);
        this.http.post<TicketReport>('http://localhost:8080/api/ticket/reportYearLocation/' + this.id, formatedDate, { headers: headers }).subscribe((data) => {
          this.report = data;
        });

      } else if (this.type == "manifestation") {
        console.log("aaaaa");
        this.headTitle = "Ticket report for manifestation with id " + this.id;
        this.http.post<TicketReport>('http://localhost:8080/api/ticket/reportManifestation/' + this.id, { headers: headers }).subscribe((data) => {
          this.report = data;
        });

      } else {
        this.headTitle = "Ticket report for manifestation day with id " + this.id;
      }


    });
  }



}
