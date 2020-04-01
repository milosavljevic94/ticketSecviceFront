import { Component } from "@angular/core";
import { AuthService } from "./modules/auth/services/auth.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ticket-service-app";

  constructor(private authService: AuthService,
    private storageService: StorageService,
    private router: Router) { }

    public ngOnInit(){
      if(this.storageService.getToken()== null) {
        this.logOut();
      } else {
        let data;
        data = this.storageService.getLocalObject("currentUser");
          
          
          if(data.authorities[0].authority == "ROLE_ADMIN") {

            (<HTMLElement>document.getElementById("manifestationsUser")).hidden = true;
            (<HTMLElement>document.getElementById("ticketsUser")).hidden = true;
            (<HTMLElement>document.getElementById("reservationsUser")).hidden = true;
            
            (<HTMLElement>document.getElementById("addressAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("locationsAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("manifestationsAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("reservationsAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("rolesAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("ticketsAdmin")).hidden = false;
            (<HTMLElement>document.getElementById("usersAdmin")).hidden = false;
            
            (<HTMLElement>document.getElementById("login")).hidden = true;
            (<HTMLElement>document.getElementById("register")).hidden = true;
            (<HTMLElement>document.getElementById("logout")).hidden = false;
              
          } else {
            (<HTMLElement>document.getElementById("manifestationsUser")).hidden = false;
            (<HTMLElement>document.getElementById("ticketsUser")).hidden = false;
            (<HTMLElement>document.getElementById("reservationsUser")).hidden = false;
            
            (<HTMLElement>document.getElementById("addressAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("locationsAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("manifestationsAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("reservationsAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("rolesAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("ticketsAdmin")).hidden = true;
            (<HTMLElement>document.getElementById("usersAdmin")).hidden = true;
            
            (<HTMLElement>document.getElementById("login")).hidden = true;
            (<HTMLElement>document.getElementById("register")).hidden = true;
            (<HTMLElement>document.getElementById("logout")).hidden = false;
          }
      }
    }

  public logOut() {
    this.authService.logout();
    
  }
}
