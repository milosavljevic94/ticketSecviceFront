import { PipeTransform, Pipe } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { StorageService } from "../services/storage/storage.service";
import { DatePipe } from "@angular/common";
import { ManForTicketDto } from '../model/ManForTicketDto';

@Pipe({
  name: "getManNameForTicket",
  pure: true
})
export class ManifestationNamePipe implements PipeTransform {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private datePipe: DatePipe
  ) {}

  transform(value: number, args?: any): any {
    return this.getManNameForTicket(value);
  }
  public getManNameForTicket(id: number) {
    let headers = new HttpHeaders();
    let token = "Bearer ";
    token += this.storageService.getToken();
    headers = headers.set("Authorization", token);
    this.http
      .get<ManForTicketDto>("http://localhost:8080/api/ticket/getManName/" + id, {
        headers: headers
      })
      .subscribe(data => {
        return data.manName;
      });
  }
}
